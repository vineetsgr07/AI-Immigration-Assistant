import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: Request) {
  try {
    const { messages, botType } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: messages.slice(0, -1),
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessage(messages[messages.length - 1].parts[0].text);
    const response = result.response;

    // Format the response
    const formattedResponse = response.text().replace(/\n/g, '\n\n');

    return NextResponse.json({ content: formattedResponse });
  } catch (error: any) {
    console.error('Gemini API error:', error);
    return NextResponse.json({ error: error.message || 'An error occurred while processing your request.' }, { status: 500 });
  }
}