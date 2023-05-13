export interface PlanItem {
  limits: {
    [model: string]: {
      window: string;
      limit: number;
    };
  };
  prices: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  plan: string;
}
