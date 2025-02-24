import Joi from 'joi';

export const athleticsMatchSchema = Joi.object({
    id: Joi.number().integer().positive(),
    event: Joi.string().valid('100m male', '100m female', '400m male', '400m female').required(),
    team_A_id: Joi.number().integer().positive().required(),
    team_B_id: Joi.number().integer().positive().required(),
    time: Joi.string().required(),
    locationId: Joi.number().integer().positive().required(),
    score_A: Joi.number().integer().min(0).default(0),
    score_B: Joi.number().integer().min(0).default(0),
});
