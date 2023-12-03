import * as Joi from 'joi';

const email = Joi.string().email();
const phone = Joi.string().pattern(/^[0-9]{11}$/);

export const IdentitySchema = Joi.alternatives().try(email, phone).required();
export const PasswordSchema = Joi.string().min(8).max(20).required();

export const RequireCodeSchema = Joi.object({
  identity: IdentitySchema,
});

export const ValidateCodeSchema = Joi.object({
  identity: IdentitySchema,
  code: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required(),
});

export const InitPasswordSchema = Joi.object({
  password: PasswordSchema.required(),
});

export const ForgetPasswordSchema = Joi.object({
  identity: Joi.alternatives().try(email, phone).required(),
  code: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required(),
  newPassword: PasswordSchema.required(),
});

export const PasswordLoginSchema = Joi.object({
  identity: IdentitySchema,
  password: PasswordSchema.required(),
});

export const bindIdentitySchema = Joi.object({
  identity: IdentitySchema,
});

export const InitAdminSchema = Joi.object({
  identity: IdentitySchema,
  password: PasswordSchema.required(),
});
