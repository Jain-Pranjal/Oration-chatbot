import React from 'react'
import { auth } from '@/lib/auth' //server instance of auth
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import ForgotPasswordForm from '@/modules/auth/ui/ForgetPasswordForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Forgot Password',
    description:
        'Reset your Oration AI Chatbot password quickly and securely. Enter your registered email to get a password reset link.',
    openGraph: {
        title: 'Oration AI Chatbot | Forgot Password',
        description:
            'Reset your Oration AI Chatbot password quickly and securely. Enter your registered email to get a password reset link.',
        url: 'https://oration-chatbot.vercel.app/forgotPassword',
        siteName: 'Oration AI',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: 'Oration AI Chatbot | Forgot Password',
        description:
            'Reset your Oration AI Chatbot password quickly and securely. Enter your registered email to get a password reset link.',
        card: 'summary_large_image',
        site: 'https://oration-chatbot.vercel.app/forgotPassword',
    },
}

async function ForgotPassword() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (session) {
        // 2️⃣ If email not verified → force to verify page
        if (!session.user.emailVerified) {
            redirect('/verify-email')
        }
        // email verified → no need to see auth page → go home
        redirect('/chat')
    }

    // only when session and email not present
    return (
        <div>
            <ForgotPasswordForm />
        </div>
    )
}

export default ForgotPassword
