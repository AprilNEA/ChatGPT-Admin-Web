import * as Joi from 'joi';

const email = Joi.string().email();
const phone = Joi.string().pattern(/^[0-9]{11}$/);
export const passwordSchema = Joi.string().min(8).max(20).required();

export const identitySchema = Joi.object({
  identity: Joi.alternatives().try(email, phone).required(),
});

export const validateCodeSchema = Joi.object({
  identity: Joi.alternatives().try(email, phone).required(),
  code: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required(),
});

export const forgetPasswordSchema = Joi.object({
  identity: Joi.alternatives().try(email, phone).required(),
  code: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required(),
  newPassword: passwordSchema.required(),
});

export const withPasswordSchema = Joi.object({
  identity: Joi.alternatives().try(email, phone).required(),
  password: passwordSchema.required(),
});

export const bindIdentitySchema = Joi.object({
  identity: Joi.alternatives().try(email, phone).required(),
  password: passwordSchema.optional(),
});
