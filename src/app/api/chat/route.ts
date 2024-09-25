import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: Request) {
  try {
    const { messages, botType } = await request.json();

    // Fun bot personalities
    const botPersonalities = {
      'general': 'a witty comedian',
      'immigration': 'a friendly immigration expert with a penchant for travel puns',
      // Add more personalities as needed
    };

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: messages.slice(0, -1),
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    // Add personality to the prompt
    const personalityPrompt = `You are ${botPersonalities[botType as keyof typeof botPersonalities] || 'a helpful assistant'}. Respond in a fun and engaging way.`;
    const userMessage = messages[messages.length - 1].parts[0].text;
    const fullPrompt = `${personalityPrompt}\n\nUser: ${userMessage}`;

    const result = await chat.sendMessage(fullPrompt);
    const response = result.response;

    // Format the response with some flair
    const formattedResponse = response.text()
      .replace(/\n/g, '\n\n')
      .replace(/(!|\?|\.)/g, '$1✨');

    // Generate a fun fact or joke
    const funFact = await generateFunFact(botType);

    return NextResponse.json({
      content: formattedResponse,
      funFact,
      responseId: uuidv4(),
      mood: getMood(formattedResponse),
    });
  } catch (error: any) {
    console.error('Oops! Our AI had a brain freeze:', error);
    return NextResponse.json({
      error: "Looks like our AI ate too much ice cream and got a brain freeze! 🍦🧠 We're warming it up, please try again!",
      errorId: uuidv4(),
    }, { status: 500 });
  }
}

async function generateFunFact(botType: string): Promise<string> {
  // You can implement this to generate a relevant fun fact or joke
  // based on the botType or use another API call
  return "Did you know? The first computer bug was an actual real-life bug! 🐛💻";
}

function getMood(response: string): string {
  // Analyze the response to determine the AI's "mood"
  const moods = ['excited', 'curious', 'amused', 'thoughtful', 'energetic'];
  return moods[Math.floor(Math.random() * moods.length)];
}