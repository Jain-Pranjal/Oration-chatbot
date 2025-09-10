import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function callCareerCounselorAI(prompt: string): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const result = await model.generateContent([
            {
                text: 'You are a helpful and supportive career counselor. Give practical and encouraging advice.',
            },
            { text: prompt },
        ])

        return result.response.text()
    } catch (err) {
        console.error('Gemini API error:', err)
        return "Sorry, I'm having trouble generating a response right now."
    }
}
