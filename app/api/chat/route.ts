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

    if (!sessionId || !message || !language) {
      console.error("Missing sessionId, message, or language.");
      return NextResponse.json({ error: "Missing sessionId, message, or language." }, { status: 400 });
    }

    const translatedPrompt = ChatPromptTemplate.fromMessages([
      ["system", `You are a helpful assistant who remembers all details the user shares with you. The user has selected the language: ${language}.`],
      ["placeholder", "{chat_history}"],
      ["human", "{input}"],
    ]);

    const translatedChain = translatedPrompt.pipe(model);

    const withMessageHistoryTranslated = new RunnableWithMessageHistory({
      runnable: translatedChain,
      getMessageHistory: async (sessionId: string) => {
        if (!messageHistories[sessionId]) {
          messageHistories[sessionId] = new InMemoryChatMessageHistory();
        }
        return messageHistories[sessionId];
      },
      inputMessagesKey: "input",
      historyMessagesKey: "chat_history",
    });

    const response = await withMessageHistoryTranslated.invoke(
      { input: message },
      { configurable: { sessionId } }
    );

    return NextResponse.json({ response: response.content });
  } catch (error) {
    console.error("Error handling chat request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
