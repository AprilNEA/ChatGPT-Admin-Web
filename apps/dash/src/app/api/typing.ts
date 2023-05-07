export interface AnalysisResponse {
  total_users: number;
  total_orders: number;
  plan_status: Record<string, number>;
}
