'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ChatInterface } from '../components/ChatInterface'

const ChatPage = () => {
    // const router = useRouter()
    const trpc = useTRPC()

    // Fetch all chat sessions
    const { data } = useSuspenseQuery(
        trpc.chat.getAllChatSessions.queryOptions()
    )

    const chatSessions = data?.chatSessions ?? []
    const activeChatSession = chatSessions?.[0] ?? null

    return (
        <>
            <ChatInterface
                chatSessions={chatSessions}
                initialActiveSession={activeChatSession}
            />
        </>
    )
}

export default ChatPage

// Loading fallback
export const ChatPageLoading = () => (
    <div className="flex h-screen items-center justify-center text-white">
        Loading chat...
    </div>
)

// Error fallback
export const ChatPageError = () => (
    <div className="flex h-screen items-center justify-center text-red-500">
        Failed to load chat. Please try again later.
    </div>
)
