import Joi from 'joi';

export const ClickDto = Joi.object({
    university: Joi.string().valid('KMUTT', 'KMITL', 'KMUTNB BKK', 'KMUTNB PR').required(),
    clicks: Joi.number().integer().positive().required()
});
