import { ChatRecord, VercelAIBot } from "./src";

const conversation: ChatRecord[] = [
  { role: "user", content: "Hello." },
];

const bot = new VercelAIBot("openai:gpt-3.5-turbo");

for await (
  const token of bot.answer({ conversation })
) {
  console.log(token);
}
