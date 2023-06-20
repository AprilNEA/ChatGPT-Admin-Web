import { z } from "zod";
import fetcher from "@/app/utils/fetcher";
import { ChatRequest, DALType } from "@caw/types";
import Plan = DALType.Plan;
import Price = DALType.Price;

export async function apiPay(plan: Plan, price: Price) {
  return await (
    await fetcher("/api/pay", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({
        priceId: price.id,
        planId: plan.planId,
      } as z.infer<typeof ChatRequest.RequestNewOrder>),
    })
  ).json();
}
