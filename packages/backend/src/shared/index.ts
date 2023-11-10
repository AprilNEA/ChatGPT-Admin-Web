import * as Joi from 'joi';

export interface PagerQuery {
  page?: number;
  limit?: number;
}

export const PagerQuerySchema = Joi.object({
  page: Joi.alternatives()
    .try(Joi.number(), Joi.string().pattern(/^\d+$/))
    .optional(),
  limit: Joi.alternatives()
    .try(Joi.number(), Joi.string().pattern(/^\d+$/))
    .optional(),
}).options({ convert: true });
