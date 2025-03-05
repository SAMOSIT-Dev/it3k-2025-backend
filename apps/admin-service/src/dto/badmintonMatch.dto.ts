import Joi from 'joi';

export const createBadmintonMatchDTO = Joi.object({
    type: Joi.string()
        .valid('mix', 'single_male', 'single_female', 'pair_male', 'pair_female')
        .required(),
    team_A_id: Joi.number().integer().positive().required(),
    team_B_id: Joi.number().integer().positive().required(),
    time: Joi.string().required(),
    team_A_number: Joi.number().integer().positive().required(),
    team_B_number: Joi.number().integer().positive().required(),
    locationId: Joi.number().integer().positive().required(),
});

export const updateBadmintonMatchDTO = Joi.object({
    type: Joi.string().valid('mix', 'single_male', 'single_female', 'pair_male', 'pair_female'),
    team_A_id: Joi.number().integer().positive(),
    team_B_id: Joi.number().integer().positive(),
    time: Joi.string(),
    team_A_number: Joi.number().integer().positive(),
    team_B_number: Joi.number().integer().positive(),
    locationId: Joi.number().integer().positive(),
});

export const createBadmintonSetDTO = Joi.object({
    badminton_match_id: Joi.number().integer().positive().required(),
    round: Joi.number().integer().positive().required(),
    score_A: Joi.number().integer().min(0).default(0),
    score_B: Joi.number().integer().min(0).default(0),
});

export const updateBadmintonSetDTO = Joi.object({
    round: Joi.number().integer().positive(),
    score_A: Joi.number().integer().min(0),
    score_B: Joi.number().integer().min(0),
});