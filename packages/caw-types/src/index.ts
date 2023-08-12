export * from "./auth";
export * from "./config";
export * from "./chat";
export * from "./order";

export interface Order {}

export interface Product {
  id: number;
  name: string;
  feature: string[];
  price: number;
  stock: number;
  duration: number;
}

export enum ErrorCode {
  LimitExceeded = "LimitExceeded",
}
