import * as Joi from 'joi';

const emailSchema = Joi.string().email().required();
const phoneSchema = Joi.string()
  .pattern(/^[0-9]{11}$/)
  .required();

export const identitySchema = Joi.object({
  identity: Joi.alternatives().try(emailSchema, phoneSchema),
});

export const loginByCodeSchema = identitySchema.keys({
  code: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required(),
});

export const byPasswordSchema = identitySchema.keys({
  password: Joi.string().required(),
});
