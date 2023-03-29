import { createParser } from "eventsource-parser";
import { NextRequest } from "next/server";

async function fetchDataWithTimeout(url:string, options:RequestInit, timeout = 30000) {
  const abortController = new AbortController();
  const signal = abortController.signal;

  // 设置超时
  const timeoutId = setTimeout(() => {
    abortController.abort();
  }, timeout);

  try {
    const res = await fetch(url, { ...options, signal });
    clearTimeout(timeoutId); // 清除超时，因为请求已完成
    return res;
    // @ts-ignore
  } catch (error) {// @ts-ignore
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
}

async function createStream(req: NextRequest) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let apiKey = process.env.OPENAI_API_KEY;

  const userApiKey = req.headers.get("token");
  if (userApiKey) {
    apiKey = userApiKey;
    console.log("[Stream] using user api key");
  }

  const res = await fetchDataWithTimeout("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: "POST",
    body: req.body,
  });

  return new ReadableStream({
    async start(controller) {
      function onParse(event: any) {
        if (event.type === "event") {
          const data = event.data;
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      }

      const parser = createParser(onParse);
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const stream = await createStream(req);
    return new Response(stream);
  } catch (error) {
    console.error("[Chat Stream]", error);
  }
}

export const config = {
  runtime: "edge",
};
