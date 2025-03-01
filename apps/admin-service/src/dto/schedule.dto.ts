import Joi from 'joi';

export const createScheduleDTO = Joi.object({
    type : Joi.string()
    .valid('football', 'basketball', 'pingpong', 'badminton', 'athletics')
    .required(),
    team_A_id: Joi.number().integer().positive().required(),
    team_B_id: Joi.number().integer().positive().required(),
    time: Joi.string().required(),
    locationId: Joi.number().integer().positive().required(),
})

export const updateScheduleDTO = Joi.object({
    type : Joi.string()
    .valid('football', 'basketball', 'pingpong', 'badminton', 'athletics'),
    team_A_id: Joi.number().integer().positive(),
    team_B_id: Joi.number().integer().positive(),
    time: Joi.string(),
    locationId: Joi.number().integer().positive(),
})
