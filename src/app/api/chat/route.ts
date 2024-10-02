import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const allowedTopics = ['visa types', 'application processes', 'common faqs', 'immigration', 'visa', 'application', 'faq', 'immigration'];

export async function POST(request: Request) {
  try {
    const { messages, botType } = await request.json();
    const userMessage = messages[messages.length - 1].parts[0].text;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: messages.slice(0, -1),
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const personalityPrompt = generateImmigrationResponse(userMessage);

    const result = await chat.sendMessage(personalityPrompt);
    const response = result.response;

    const formattedResponse = response.text().replace(/\n/g, '\n\n');

    return NextResponse.json({
      content: formattedResponse,
      responseId: uuidv4(),
    });
  } catch (error: any) {
    console.error('Error in AI response:', error);
    return NextResponse.json({
      error: "We're sorry, but we couldn't process your request at the moment. Please try again later.",
      errorId: uuidv4(),
    }, { status: 500 });
  }
}


function generateImmigrationResponse(userMessage: string): string {
  return `As a knowledgeable immigration advisor, provide a helpful and concise response to the following question, focusing only on visa types, application processes, or common FAQs about immigration. Do not provide any information outside of these topics.

User: ${userMessage}

Response:`;
}