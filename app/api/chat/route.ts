import { NextRequest, NextResponse } from 'next/server';
import { ChatFireworks } from "@langchain/community/chat_models/fireworks";
import { InMemoryChatMessageHistory } from '@langchain/core/chat_history';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableWithMessageHistory } from '@langchain/core/runnables';

const model = new ChatFireworks({
  model: "accounts/fireworks/models/llama-v3p1-70b-instruct",
  temperature: 0,
  apiKey: process.env.NEXT_PUBLIC_FIREWORK_KEY,
});

const messageHistories: Record<string, InMemoryChatMessageHistory> = {};

const prompt = ChatPromptTemplate.fromMessages([
  ["system", `You are a helpful assistant who remembers all details the user shares with you.`],
  ["placeholder", "{chat_history}"],
  ["human", "{input}"],
]);

const chain = prompt.pipe(model);

const withMessageHistory = new RunnableWithMessageHistory({
  runnable: chain,
  getMessageHistory: async (sessionId: string) => {
    if (!messageHistories[sessionId]) {
      messageHistories[sessionId] = new InMemoryChatMessageHistory();
    }
    return messageHistories[sessionId];
  },
  inputMessagesKey: "input",
  historyMessagesKey: "chat_history",
});

export async function POST(req: NextRequest) {
  try {
    const { sessionId, message, language } = await req.json();

    if (!sessionId || sessionId.trim() === "" || !message || !language) {
      console.error("Missing sessionId, message, or language.");
      return NextResponse.json({ error: "Missing sessionId, message, or language." }, { status: 400 });
    }

    // Ensure the language is passed correctly
    const config = {
      configurable: {
        sessionId,
        language, // Ensure the language parameter is used in the model configuration
      },
    };

    const responseStream = new ReadableStream({
      async start(controller) {
        try {
          const response = await withMessageHistory.invoke(
            { input: message },
            config
          );

          let content: string;

          if (typeof response.content === 'string') {
            content = response.content;
          } else if (Array.isArray(response.content)) {
            content = response.content.join(''); // Join array elements into a string
          } else {
            content = JSON.stringify(response.content);
          }

          // Send JSON object as response
          controller.enqueue(new TextEncoder().encode(JSON.stringify({ response: content })));
          controller.close();
        } catch (error) {
          console.error("Error handling chat request:", error);
          controller.error(error);
        }
      }
    });

    return new NextResponse(responseStream, {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error handling chat request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
