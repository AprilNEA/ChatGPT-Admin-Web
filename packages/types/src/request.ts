import { z } from "zod";

export namespace ChatRequest {
  export const UserRegisterPost = z.object({
    email: z.string(),
    phone: z.number(),
    password: z.string(),
    register_code: z.number(),
    invitation_code: z.string(),
  });
}
