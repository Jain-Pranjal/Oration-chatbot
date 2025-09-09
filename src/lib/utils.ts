import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Metadata } from 'next'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const appURL = process.env.NEXT_PUBLIC_APP_URL!

// Metadata
export function constructMetadata(): Metadata {
    return {
        metadataBase: new URL(appURL),
        manifest: '/manifest.json',
        title: {
            default: 'Oration Career Counseling Chatbot',
            template: 'Oration Career Counseling Chatbot | %s',
        },
        description:
            'Empower your career journey with Oration, an AI-powered chatbot designed for personalized career counseling. Get expert advice on job searches, skill development, resume building, and more.',
        applicationName: 'Oration Career Counseling Chatbot',
        keywords: [
            'career counseling',
            'job advice',
            'career guidance',
            'resume help',
            'skill development',
            'interview tips',
            'AI chatbot',
            'professional growth',
        ],
        openGraph: {
            title: 'Oration Career Counseling Chatbot',
            description:
                'Empower your career journey with Oration, an AI-powered chatbot designed for personalized career counseling. Get expert advice on job searches, skill development, resume building, and more.',
            url: appURL,
            siteName: 'Oration Career Counseling Chatbot',
            locale: 'en_US',
            type: 'website',
            images: [
                {
                    url: '/opengraph-image.png',
                    width: 1200,
                    height: 630,
                    alt: 'OpenGraph Image',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Oration Career Counseling Chatbot',
            description:
                'Empower your career journey with Oration, an AI-powered chatbot designed for personalized career counseling. Get expert advice on job searches, skill development, resume building, and more.',
            images: [
                {
                    url: '/twitter-image.png',
                    width: 1200,
                    height: 630,
                    alt: 'Twitter Image',
                },
            ],
            creator: '@PranjalJain03',
        },
    }
}
