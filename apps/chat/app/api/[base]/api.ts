import useSWR from "swr";
import fetcher from "@/app/utils/fetcher";
import { ChatResponse } from "@caw/types";

export async function apiPlan() {
  return await (await fetcher("/api/plan")).json();
}

export function usePlan() {
  const { data, isLoading } = useSWR<ChatResponse.PlanGet>(
    "/api/plan",
    apiPlan,
  );

  return {
    data,
    isLoading,
  };
}
