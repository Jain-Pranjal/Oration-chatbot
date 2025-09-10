import { GoogleGenerativeAI } from '@google/generative-ai'
import { readFileSync } from 'fs'
import path from 'path'

const promptPath = path.join(process.cwd(), 'src', 'lib', 'prompt.md')
const systemPrompt = readFileSync(promptPath, 'utf-8')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function callCareerCounselorAI(
    userMessage: string
): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const result = await model.generateContent([
            { text: systemPrompt }, // system role prompt
            { text: userMessage }, // user input
        ])

        return result.response.text()
    } catch (err) {
        console.error('Gemini API error:', err)
        return 'Sorry, I’m having trouble generating a response right now.'
    }
}
