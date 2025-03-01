import Joi from "joi";

export const createFootballDTO = Joi.object({
    team_A_id: Joi.number().integer().positive().required(),
    team_B_id: Joi.number().integer().positive().required(),
    timeStart: Joi.string().required(),
    timeEnd: Joi.string().required(),
    locationId: Joi.number().integer().positive().required(),
});

export const updateFootballDTO = Joi.object({
    status: Joi.string()
    .valid('upcoming','ongoing', 'break', 'finished'),
    team_A_id: Joi.number().integer().positive(),
    team_B_id: Joi.number().integer().positive(),
    timeStart: Joi.string(),
    timeEnd: Joi.string(),
    locationId: Joi.number().integer().positive(),
});

export const updateFootballScoreDTO = Joi.object({
    score_A: Joi.number().integer(),
    score_B: Joi.number().integer(),
})