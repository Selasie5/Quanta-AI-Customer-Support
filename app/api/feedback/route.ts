// /app/api/feedback/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, messageId, rating, comment } = await req.json();

    if (!sessionId || !messageId || rating === undefined) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // TODO: Store feedback in a database or a logging system
    // Example: await feedbackDatabase.store({ sessionId, messageId, rating, comment });

    console.log(`Feedback received: sessionId=${sessionId}, messageId=${messageId}, rating=${rating}, comment=${comment}`);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error handling feedback:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
