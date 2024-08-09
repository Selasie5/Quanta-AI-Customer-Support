import {NextResponse} from "next/server"
import OpenAI from "openai"

const systemPrompt ="You are responsible for initiating an asynchronous process using the provided controller. Ensure that the operation is started efficiently, handling any errors gracefully, and providing meaningful feedback throughout the process. If applicable, inform the user about the progress, and log significant events for monitoring purposes. Your goal is to start the process in a controlled and optimized manner."

//POST FUNCTION TO HANDLE INCOMING REQUESTS
export async function POST(req: { json: () => any; }){
    const openai = new OpenAI(); //Creating an instance of the  OPENAI client
    const data = await req.json()

    //Chat Completion Request
    const completion = await openai.chat.completions.create({
        messages:[{role: 'system', content:systemPrompt}, ...data],
        model: 'gpt-4o',
        stream: true,
    })

    //Handling streaming response via a Readable stream
    const stream = new ReadableStream({
        async start(controller)
        {
            const encoder = new TextEncoder()
            try {
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if(content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch (err) {
                controller.error(err)
            }finally{
                controller.close()
            }
        }
    })

    return new NextResponse(stream)
}