import z from 'zod';

export namespace AuthDTO {
  const email = z.string().email();
  const phone = z.string().regex(/^[0-9]{11}$/);
  export const codeSchema = z.string().regex(/^[0-9]{6}$/);

  export const identitySchema = z.union([email, phone]);

  export const passwordSchema = z.string().min(8).max(20);

  export const RequireCodeSchema = z.object({
    identity: identitySchema,
  });
  export type RequireCodeDto = z.infer<typeof RequireCodeSchema>;

  export const ValidateCodeSchema = z.object({
    identity: identitySchema,
    code: codeSchema,
  });
  export type ValidateCodeDto = z.infer<typeof ValidateCodeSchema>;

  export const ForgetPasswordSchema = z.object({
    identity: identitySchema,
    code: codeSchema,
    newPassword: passwordSchema,
  });
  export type ForgetPasswordDto = z.infer<typeof ForgetPasswordSchema>;

  export const ChangePasswordSchema = z.object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
  });
  export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;

  export const PasswordLoginSchema = z.object({
    identity: identitySchema,
    password: passwordSchema,
  });
  export type PasswordLoginDto = z.infer<typeof PasswordLoginSchema>;

  export const BindIdentitySchema = z.object({
    identity: identitySchema,
  });
  export type BindIdentityDto = z.infer<typeof BindIdentitySchema>;

  export const InitAdminSchema = z.object({
    identity: identitySchema,
    password: passwordSchema,
  });
  export type InitAdminDto = z.infer<typeof InitAdminSchema>;

  export const InitUsernameSchema = z.object({
    username: z.string().min(2).max(20),
  });
  export type InitUsernameDto = z.infer<typeof InitUsernameSchema>;

  export const InitPasswordSchema = z.object({
    password: passwordSchema,
  });
  export type InitPasswordDto = z.infer<typeof InitPasswordSchema>;
}

export namespace ChatDTO {}

export namespace OrderDTO {
  export const NewOrderSchema = z.object({
    productId: z.number(),
  });
  export type NewOrderDto = z.infer<typeof NewOrderSchema>;
}
