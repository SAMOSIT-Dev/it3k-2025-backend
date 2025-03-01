import Joi from 'joi';

export const createBasketballDTO = Joi.object({
    team_A_id: Joi.number().integer().positive().required(),
    team_B_id: Joi.number().integer().positive().required(),
    time: Joi.string().required(),
    locationId: Joi.number().integer().positive().required(),
})

export const updateBasketballMatchDTO = Joi.object({
    status: Joi.string()
    .valid('upcoming','ongoing', 'break', 'finished'),
    team_A_id: Joi.number().integer().positive(),
    team_B_id: Joi.number().integer().positive(),
    time: Joi.string(),
    locationId: Joi.number().integer().positive(),
})

export const updateBasketballScoreDTO = Joi.object({
    score_A_Q1: Joi.number().integer(),
    score_A_Q2: Joi.number().integer(),
    score_B_Q1: Joi.number().integer(),
    score_B_Q2: Joi.number().integer(),
    score_A_OT: Joi.number().integer(),
    score_B_OT: Joi.number().integer(),
})