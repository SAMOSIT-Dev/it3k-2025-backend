import Joi from 'joi';

export const createBadmintonMatchDTO = Joi.object({
    type: Joi.string()
        .valid('mix', 'single_male', 'single_female', 'pair_male', 'pair_female')
        .required(),
    team_A_id: Joi.number().integer().positive().required(),
    team_B_id: Joi.number().integer().positive().required(),
    time: Joi.string().required(),
    locationId: Joi.number().integer().positive().required(),
});

export const updateBadmintonMatchDTO = Joi.object({
    type: Joi.string().valid('mix', 'single_male', 'single_female', 'pair_male', 'pair_female'),
    team_A_id: Joi.number().integer().positive(),
    team_B_id: Joi.number().integer().positive(),
    time: Joi.string(),
    locationId: Joi.number().integer().positive(),
});
