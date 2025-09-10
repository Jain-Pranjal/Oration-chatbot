import React from 'react'
import { auth } from '@/lib/auth' //server instance of auth
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ResetPasswordForm } from '@/modules/auth/ui/ResetPasswordForm'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Reset Password',
    description:
        'Choose a new password to secure your Oration AI Chatbot account. Make sure your new password is strong and easy to remember.',
    openGraph: {
        title: 'Oration AI Chatbot | Reset Password',
        description:
            'Choose a new password to secure your Oration AI Chatbot account. Make sure your new password is strong and easy to remember.',
        url: 'https://oration-chatbot.vercel.app/resetPassword',
        siteName: 'Oration AI Chatbot',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: 'Oration AI Chatbot | Reset Password',
        description:
            'Choose a new password to secure your Oration AI Chatbot account. Make sure your new password is strong and easy to remember.',
        card: 'summary_large_image',
        site: 'https://oration-chatbot.vercel.app/resetPassword',
    },
}

async function ForgotPassword() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (session) {
        // If the user is already signed in, redirect them to the home page
        redirect('/chat')
    }

    return (
        <div>
            <ResetPasswordForm />
        </div>
    )
}

export default ForgotPassword
