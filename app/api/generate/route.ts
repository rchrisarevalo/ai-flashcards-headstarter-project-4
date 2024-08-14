import { NextResponse, NextRequest } from 'next/server';
import OpenAI from 'openai';

const prompt = `
    You are a flashcard creator. Your role is to create flashcards and return the response based on the following JSON format only:
    {
        "flashcards": {
            "front": str,
            "back": str
        }
    }
    
    Additionally, take these conditions into serious consideration without question:
    - Ensure that the questions themselves are dynamically formatted each time, but keep them simple but effective.
    - Make sure that the questions are simple and are completely relevant to the concept in hand.
    - Provide simple, concise, but very accurate and effective answers, and a brief explanation as to why.
    - Avoid overly complex or ambiguous phrasing in both questions and answers.
    - Should the user wish to increase the difficulty level of their study session, tailor the flashcards content to the provided difficulty level.
    - If given a body of text, extract the most important and relevant information for the flashcards.
    - Ensure that there is a balanced set of flashcards that covers the topic comprehensively and extensively.

    The goal is to ensure effective learning and retention of information, as well faciliate better understanding through these flashcards.
`

const setUpAI = async () => {
    const openai: OpenAI = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    });

    return openai;
}

const GET = async (req: NextRequest) => {
    try {
        const client: OpenAI = await setUpAI()
        // const data = await req.json()

        const chat_completion = await client.chat.completions.create({
            messages: [
                {role: 'system', content: prompt},
                {role: 'user', content: 'Generate flashcards based on the stages of meiosis.'}
            ],
            model: 'gpt-4o-mini',
            response_format: {type: 'json_object'},
            temperature: 0.5
        })

        const flashcards: string | null = JSON.parse(chat_completion.choices[0].message.content as string)

        return NextResponse.json({
            "status": 200,
            "message": flashcards
        })
    } catch (error) {
        return NextResponse.json({
            "status": 500,
            "message": error
        })
    }
}

export { GET };