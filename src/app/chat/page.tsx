// server component

import React from 'react'
import ChatPage from '@/modules/chat/ui/views/ChatView'
import { auth } from '@/lib/auth' //server instance of auth
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import {
    ChatPageLoading,
    ChatPageError,
} from '@/modules/chat/ui/views/ChatView'
import { ErrorBoundary } from 'react-error-boundary'

export const metadata: Metadata = {
    title: 'Chat',
    description:
        'Get the best career advice and guidance from our AI-powered career counselor. Start your journey to success today!',
    openGraph: {
        title: 'Chat',
        description:
            'Get the best career advice and guidance from our AI-powered career counselor. Start your journey to success today!',
        url: 'https://oration-chatbot.vercel.app/chat',
        siteName: 'Oration AI Chatbot',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: 'Chat',
        description:
            'Get the best career advice and guidance from our AI-powered career counselor. Start your journey to success today!',
        card: 'summary_large_image',
        site: 'https://oration-chatbot.vercel.app/chat',
    },
}

const OrationChatBot = async () => {
    const queryClient = getQueryClient()

    // Prefetch all user chat sessions (so sidebar/history loads instantly)
    void queryClient.prefetchQuery(trpc.chat.getAllChatSessions.queryOptions())

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        // If the user is not signed in, redirect them to sign in page
        redirect('/sign-in')
    }
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<ChatPageLoading />}>
                <ErrorBoundary fallback={<ChatPageError />}>
                    <ChatPage />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default OrationChatBot
