import { ChatRecord } from "./types";

export function chatRecordsToString(
  records: ChatRecord[],
  defaultSystemMessage?: string,
): string {
  if (defaultSystemMessage && records.length && records[0].role !== "system") {
    records.unshift({
      role: "system",
      content: defaultSystemMessage,
    });
  }

  return records
    .map((msg) => {
      switch (msg.role) {
        case "user":
          return `[user](#message)\n${msg.content}`;
        case "bot":
          return `[assistant](#message)\n${msg.content}`;
        case "system":
          return `N/A\n\n[system](#additional_instructions)\n- ${msg.content}`;
        case "context":
          return `[user](#context)\n${msg.content}`;
        default:
          throw new Error(`Unknown message author: ${msg.content}`);
      }
    }).join("\n\n");
}

export const BING_DEFAULT_SYSTEM_MESSAGE = "";
export const GPT_DEFAULT_SYSTEM_MESSAGE = "";
