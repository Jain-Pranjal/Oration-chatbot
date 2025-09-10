import React from 'react'
import SignupView from '@/modules/auth/ui/SignUpView'
import { auth } from '@/lib/auth' //server instance of auth
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sign Up',
    description:
        'Join Oration AI Chatbot to chat with the career counselor and get personalized guidance.',
    openGraph: {
        title: 'Oration AI Chatbot | Sign Up',
        description:
            'Join Oration AI Chatbot to chat with the career counselor and get personalized guidance.',
        url: 'https://oration-chatbot.vercel.app/sign-up',
        siteName: 'Oration AI Chatbot',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: 'Oration AI Chatbot | Sign Up',
        description:
            'Join Oration AI Chatbot to chat with the career counselor and get personalized guidance.',
        card: 'summary_large_image',
        site: 'https://oration-chatbot.vercel.app/sign-up',
    },
}

async function SignIn() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (session) {
        // If the user is already signed in, redirect them to the home page
        redirect('/chat')
    }

    return (
        <div>
            <SignupView />
        </div>
    )
}

export default SignIn
