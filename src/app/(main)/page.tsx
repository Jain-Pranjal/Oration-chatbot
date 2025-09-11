import React from 'react'
import LandingPage from '@/modules/landing/ui/views/LandingPage'
import { auth } from '@/lib/auth' //server instance of auth
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Welcome',
    description:
        'Get the best career advice and guidance from our AI-powered career counselor. Start your journey to success today!',
    openGraph: {
        title: 'Welcome',
        description:
            'Get the best career advice and guidance from our AI-powered career counselor. Start your journey to success today!',
        url: 'https://oration-chatbot.vercel.app',
        siteName: 'Oration AI Chatbot',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: 'Welcome',
        description:
            'Get the best career advice and guidance from our AI-powered career counselor. Start your journey to success today!',
        card: 'summary_large_image',
        site: 'https://oration-chatbot.vercel.app',
    },
}

const page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (session) {
        // If user is signed in, redirect to chat page
        redirect('/chat')
    }

    return <LandingPage />
}

export default page
