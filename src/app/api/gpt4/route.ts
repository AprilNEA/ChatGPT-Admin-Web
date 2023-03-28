import {NextRequest} from "next/server";
import {askGPT} from '@/app/api/gpt4/gpt4'


export async function POST(req: NextRequest) {
  try {
    const {messages, max_tokens, temperature} = await new Response(req.body).json()
    const conversations = messages.map(
      // @ts-ignore
      ({role, content}) => ({role, text: content}),
    );

    const gptStream = await askGPT({
      conversations,
      system_message: "You are ChatGPT based on GPT-4.",
    }, {max_tokens, temperature, cookie: process.env.***REMOVED***!})

    if (!gptStream) {
      console.error("[Chat Stream]", "[***REMOVED*** API ERROR]");
      return new Response('[INTERNAL ERROR]', {status: 500})
    }

    const stream = readableStreamFromIterable(gptStream)

    const headers = new Headers();
    headers.append("Content-Type", "text/event-stream");
    headers.append("Cache-Control", "no-cache");
    headers.append("Connection", "keep-alive");


    return new Response(stream, {headers})
  } catch (error) {
    console.error("[Chat Stream]", error);
    return new Response('[INTERNAL ERROR]', {status: 500})
  }
}

// copied from deno/std
function readableStreamFromIterable(
  iterable: Iterable<string> | AsyncIterable<string>,
): ReadableStream<Uint8Array> {
  const iterator: Iterator<string> | AsyncIterator<string> =
    (iterable as AsyncIterable<string>)[Symbol.asyncIterator]?.() ??
    (iterable as Iterable<string>)[Symbol.iterator]?.();

  const encoder = new TextEncoder()

  return new ReadableStream({
    async pull(controller) {
      const {value, done} = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(encoder.encode(value));
      }
    },
    async cancel(reason) {
      if (typeof iterator.throw == "function") {
        try {
          await iterator.throw(reason);
        } catch { /* `iterator.throw()` always throws on site. We catch it. */
        }
      }
    },
  });
}

export const config = {
  runtime: "edge",
};
