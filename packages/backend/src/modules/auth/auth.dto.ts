import * as Joi from 'joi';

const email = Joi.string().email();
const phone = Joi.string().pattern(/^[0-9]{11}$/);
const password = Joi.string().min(8).max(20).required();

export const identitySchema = Joi.object({
  identity: Joi.alternatives().try(email, phone).required(),
});

export const validateCodeSchema = Joi.object({
  identity: identitySchema,
  code: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required(),
});

export const passwordSchema = Joi.object({
  identity: Joi.alternatives().try(email, phone).required(),
  password: password.required(),
});

export const bindPasswordSchema = Joi.object({
  password: password.required(),
});
