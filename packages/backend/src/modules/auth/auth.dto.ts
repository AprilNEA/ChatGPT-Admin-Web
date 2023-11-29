import * as Joi from 'joi';

const email = Joi.string().email();
const phone = Joi.string().pattern(/^[0-9]{11}$/);

const _identitySchema = Joi.alternatives().try(email, phone).required();
export const passwordSchema = Joi.string().min(8).max(20).required();

export const initUsernameSchema = Joi.object({
  username: Joi.string().min(2).max(12).optional(),
});

export const identitySchema = Joi.object({
  identity: _identitySchema,
});

export const validateCodeSchema = Joi.object({
  identity: Joi.alternatives().try(email, phone).required(),
  code: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required(),
});

export const initPasswordSchema = Joi.object({
  password: passwordSchema.required(),
});

export const forgetPasswordSchema = Joi.object({
  identity: Joi.alternatives().try(email, phone).required(),
  code: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required(),
  newPassword: passwordSchema.required(),
});

export const withPasswordSchema = Joi.object({
  password: passwordSchema.required(),
});

export const bindIdentitySchema = Joi.object({
  identity: Joi.alternatives().try(email, phone).required(),
});

export const initAdminSchema = Joi.object({
  identity: _identitySchema,
  password: passwordSchema.required(),
});
