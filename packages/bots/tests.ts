import { ChatRecord, VercelGPT3Bot } from "./src";

const conversation: ChatRecord[] = [
  { role: "user", content: "Hello." },
];

const bot = new VercelGPT3Bot();

for await (
  const token of bot.answer({ conversation })
) {
  console.log(token);
}
