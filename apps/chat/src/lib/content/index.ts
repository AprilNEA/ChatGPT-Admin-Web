import { tencentTextSecurity } from "@/lib/content/tencent";

export async function textSecurity(conversation: any) {
  return await tencentTextSecurity(JSON.stringify(conversation));
}
