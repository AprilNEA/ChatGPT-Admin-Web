import { z } from "zod";
import { DALType } from "./dal";

export namespace ChatRequest {
  /**
   *
   */
  export const UserLogin = z.object({
    providerId: z.string(),
    providerContent: z.object({
      content: z.string(),
      password: z.string(),
    }),
  });
  /**
   *
   */
  export const UserRegisterPost = z.object({
    email: z.string().optional(),
    phone: z.string().optional(),
    password: z.string().optional(),
    register_code: z.string().optional(),
    invitation_code: z.string().optional(),
  });

  /**
   *
   */
  export const UserRegisterCodeGet = z.object({
    type: z.enum(["email", "phone"]),
    value: z.string(),
  });

  export const RequestNewOrder = z.object({
    planId: z.number(),
    priceId: z.number(),
  });
}
