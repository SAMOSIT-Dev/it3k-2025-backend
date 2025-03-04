import Joi from "joi";

export const createPingPongMatchDTO = Joi.object({
    type: Joi.string()
        .valid('mix', 'single_male', 'single_female', 'pair_male', 'pair_female')
        .required(),
    team_A_id: Joi.number().integer().positive().required(),
    team_B_id: Joi.number().integer().positive().required(),
    time: Joi.string().required(),
    locationId: Joi.number().integer().positive().required(),
});

export const updatePingPongMatchDTO = Joi.object({
    type: Joi.string().valid('mix', 'single_male', 'single_female', 'pair_male', 'pair_female'),
    team_A_id: Joi.number().integer().positive(),
    team_B_id: Joi.number().integer().positive(),
    time: Joi.string(),
    teamId: Joi.number().integer().positive(),
    locationId: Joi.number().integer().positive(),
});

export const createPingPongSetDTO = Joi.object({
    pingpong_match_id: Joi.number().integer().positive().required(),
    round: Joi.number().integer().positive().required(),
    score_A: Joi.number().integer().min(0).default(0),
    score_B: Joi.number().integer().min(0).default(0),
});

export const updatePingPongSetDTO = Joi.object({
    round: Joi.number().integer().positive(),
    score_A: Joi.number().integer().min(0),
    score_B: Joi.number().integer().min(0),
});