import { GoogleGenerativeAI } from '@google/generative-ai'
import { readFileSync } from 'fs'
import path from 'path'

const promptPath = path.join(process.cwd(), 'src', 'lib', 'prompt.md')
const systemPrompt = readFileSync(promptPath, 'utf-8')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function callCareerCounselorAI(userMessage: string) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        // Start streaming
        const stream = await model.generateContentStream([
            { text: systemPrompt },
            { text: userMessage },
        ])

        // Collect chunks progressively
        let finalText = ''
        for await (const chunk of stream.stream) {
            const chunkText = chunk.text()
            if (chunkText) {
                finalText += chunkText
                // 🔥 Here you can push partial text to the client via SSE / WebSocket
                console.log('Partial:', chunkText)
            }
        }

        // When streaming ends
        return finalText
    } catch (err) {
        console.error('Gemini Streaming API error:', err)
        return 'Sorry, I’m having trouble generating a response right now.'
    }
}
