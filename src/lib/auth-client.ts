// Better Auth client instance
import { createAuthClient } from 'better-auth/react'
import { oneTapClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
    plugins: [
        oneTapClient({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ONE_TAP_CLIENT_ID!,
            autoSelect: false,
            cancelOnTapOutside: true,
            context: 'signin',
            // Configure prompt behavior and exponential backoff:
            promptOptions: {
                baseDelay: 1000,
                maxAttempts: 5,
            },
        }),
    ],
})
