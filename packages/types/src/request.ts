import { z } from "zod";

export namespace ChatRequest {
  /**
   *
   */
  export const UserRegisterPost = z.object({
    email: z.string(),
    phone: z.number(),
    password: z.string(),
    register_code: z.number(),
    invitation_code: z.string(),
  });

  /**
   *
   */
  export const UserRegisterCodeGet = z.object({
    type: z.enum(["email", "phone"]),
    value: z.string(),
  });
}
