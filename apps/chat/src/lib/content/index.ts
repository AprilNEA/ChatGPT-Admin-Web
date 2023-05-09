import { tencentTextSecurity } from "@/lib/content/tencent";
import { baiduTextSecurity } from "@/lib/content/baidu";

const service = process.env.TEXT_SECURITY ?? "";

export async function textSecurity(conversation: any) {
  /* If the secure text service is not set up.*/
  switch (service?.toLowerCase()) {
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
