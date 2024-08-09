import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPEN_ROUTER_KEY;
const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';

const openai = new OpenAI({
  apiKey: OPENROUTER_API_KEY,
  baseURL: OPENROUTER_BASE_URL,
//   defaultHeaders: {
//     'HTTP-Referer': 'https://github.com/OpenRouterTeam/openrouter-examples',
//   },
});

export async function POST(req: NextRequest, res: { write: (arg0: Uint8Array, arg1: () => void) => void; }) {
  try {
    const { messages } = await req.json();

    const userMessage = messages[messages.length - 1].text;

    // Create a completion with streaming
    const stream = await openai.chat.completions.create({
        model: 'openai/gpt-4',
        messages: [{ role: 'user', content: userMessage }],
        stream: true,
    });

    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', 'text/event-stream');
    responseHeaders.set('Cache-Control', 'no-cache');
    responseHeaders.set('Connection', 'keep-alive');

    let combinedText = '';

    for await (const part of stream) {
      combinedText += part.choices[0]?.delta?.content || '';
      const chunk = part.choices[0]?.delta?.content || '';
      const encodedChunk = new TextEncoder().encode(chunk);
      await new Promise((resolve) => {
        res.write(encodedChunk, () => {
          resolve(true);
        });
      });
    }

    return new NextResponse(combinedText, { headers: responseHeaders });

  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
