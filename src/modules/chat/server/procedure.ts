import { protectedProcedure, createTRPCRouter } from '@/trpc/init'
import { z } from 'zod'
import { db } from '@/db'
import { chatSession, message, messageSenderEnum } from '@/db/schema'
import { eq, desc, asc, and } from 'drizzle-orm'
import { callCareerCounselorAI } from '@/lib/ai'
import { TRPCError } from '@trpc/server'

export const chatRouter = createTRPCRouter({
    // Create a new chat session
    create: protectedProcedure
        .input(z.object({ title: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            const [session] = await db
                .insert(chatSession)
                .values({
                    title: input.title,
                    userId: ctx.auth.session.userId,
                })
                .returning()
            return session
        }),

    // List all chat sessions for the user
    getAllChatSessions: protectedProcedure.query(async ({ ctx }) => {
        const chatSessions = await db
            .select()
            .from(chatSession)
            .where(eq(chatSession.userId, ctx.auth.session.userId))
            .orderBy(desc(chatSession.createdAt))
        return { chatSessions }
    }),

    // Get one session (with messages optionally)
    getChatSessionById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const session = await db
                .select()
                .from(chatSession)
                .where(eq(chatSession.id, input.id))
                .limit(1)

            if (!session.length)
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Chat session not found',
                })

            // Fetch messages belonging to this session
            const messages = await db
                .select()
                .from(message)
                .where(eq(message.chatSessionId, input.id))
                .orderBy(asc(message.createdAt))

            return { session: session[0], messages }
        }),
})

export const messageRouter = createTRPCRouter({
    // Send a user message and get AI response
    sendMessage: protectedProcedure
        .input(
            z.object({
                chatSessionId: z.string(),
                content: z.string().min(1),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const session = await db
                .select()
                .from(chatSession)
                .where(
                    and(
                        eq(chatSession.id, input.chatSessionId),
                        eq(chatSession.userId, ctx.auth.session.userId)
                    )
                )
                .limit(1)

            if (!session.length)
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Chat session not found',
                })

            // Save user message
            const [userMessage] = await db
                .insert(message)
                .values({
                    chatSessionId: input.chatSessionId,
                    sender: messageSenderEnum.enumValues[0], // Assuming 'user' is the first enum value
                    content: input.content,
                })
                .returning()

            // Call Gemini AI
            const aiReply = await callCareerCounselorAI(input.content)

            // Save AI message
            const [aiMessage] = await db
                .insert(message)
                .values({
                    chatSessionId: input.chatSessionId,
                    sender: messageSenderEnum.enumValues[1], // Assuming 'ai' is the second enum value
                    content: aiReply,
                })
                .returning()

            return { userMessage, aiMessage }
        }),

    // Get messages for a session (with pagination)
    getMessages: protectedProcedure
        .input(
            z.object({
                chatSessionId: z.string(),
                limit: z.number().min(1).max(50).default(20),
                cursor: z.string().optional(), // message.id cursor for pagination
            })
        )
        .query(async ({ ctx, input }) => {
            const messages = await db
                .select()
                .from(message)
                .where(eq(message.chatSessionId, input.chatSessionId))
                .orderBy(asc(message.createdAt))
                .limit(input.limit)

            return messages
        }),
})
