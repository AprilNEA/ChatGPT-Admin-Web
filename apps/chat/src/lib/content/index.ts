import { tencentTextSecurity } from "@/lib/content/tencent";
import { baiduTextSecurity } from "@/lib/content/baidu";

const service = process.env.TextSecurity ?? "baidu";

export async function textSecurity(conversation: any) {
  switch (service) {
    case "baidu":
      return await baiduTextSecurity(JSON.stringify(conversation));
    case "tencent":
      const suggestion = await tencentTextSecurity(
        JSON.stringify(conversation)
      );
      return suggestion.toLowerCase() === "pass";
    default:
      return true;
  }
}
