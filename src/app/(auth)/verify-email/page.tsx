import React from 'react'
import { auth } from '@/lib/auth' //server instance of auth
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import ReEmailVerificationForm from '@/modules/auth/ui/ReEmailVerificationForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Verify Email',
    description:
        'Please verify your email address to activate your Oration AI Chatbot account. A confirmation link has been sent to your inbox. Secure your account and get started now.',
    openGraph: {
        title: 'Oration AI Chatbot | Verify Email',
        description:
            'Please verify your email address to activate your Oration AI Chatbot account. A confirmation link has been sent to your inbox. Secure your account and get started now.',
        url: 'https://oration-chatbot.vercel.app/verify-email',
        siteName: 'Oration AI Chatbot',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: 'Oration AI Chatbot | Verify Email',
        description:
            'Please verify your email address to activate your Oration AI Chatbot account. A confirmation link has been sent to your inbox. Secure your account and get started now.',
        card: 'summary_large_image',
        site: 'https://oration-chatbot.vercel.app/verify-email',
    },
}

async function VerifyEmail() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (session) {
        // If the user is already signed in, redirect them to the home page
        redirect('/chat')
    }

    return (
        <div>
            <ReEmailVerificationForm />
        </div>
    )
}

export default VerifyEmail

// it will verify if the email timeline gets expired or not so that we can again send the verification mail
