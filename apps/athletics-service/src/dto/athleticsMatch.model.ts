import Joi from 'joi';

const baseAthleticsMatchSchema = Joi.object({
    event: Joi.string().valid('100m_male', '100m_female', '400m_male', '400m_female'),
    team_A_id: Joi.number().integer().positive(),
    team_B_id: Joi.number().integer().positive(),
    team_C_id: Joi.number().integer().positive(),
    team_D_id: Joi.number().integer().positive(),
    time: Joi.string(),
    locationId: Joi.number().integer().positive(),
    score_A: Joi.number().integer().min(0),
    score_B: Joi.number().integer().min(0),
    score_C: Joi.number().integer().min(0),
    score_D: Joi.number().integer().min(0),
});

export const createAthleticsMatchDTO = baseAthleticsMatchSchema.fork(
    Object.keys(baseAthleticsMatchSchema.describe().keys),
    (schema) => schema.required()
);

export const updateAthleticsMatchDTO = baseAthleticsMatchSchema;

