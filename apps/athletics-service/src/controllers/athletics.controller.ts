import { Request, Response } from 'express';
import { pool } from '../database/database';
import { createAthleticsMatchDTO, updateAthleticsMatchDTO } from '../dto/athleticsMatch.dto';
import { AthleticsMatch, GroupedMatch } from '../model/athleticsMatch.model';
import { errorResponse, successResponse, validationErrorResponse } from '../utils/apiResponse';
import { groupMatchesByEvent } from '../utils/mapper';
import AthleticService from '../services/athletics.service';

export const createMatch = async (req: Request, res: Response) => {
    const { error, value } = createAthleticsMatchDTO.validate(req.body);

    if (error) {
        return validationErrorResponse({ res, error_details: error.details });
    }

    const existedMatch = AthleticService.getMatchByEvent(value.event);

    if (existedMatch) {
        return errorResponse({ res, error: 'Match already existed', statusCode: 409 });
    }

    // TODO: Validate University & Location IDs
    try {
        const [result] = await pool.execute(
            'INSERT INTO athletics_matches (event, team_A_id, team_B_id, team_C_id, team_D_id, time, locationId, score_A, score_B, score_C, score_D) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [value.event, value.team_A_id, value.team_B_id, value.team_C_id, value.team_D_id, value.time, value.locationId, value.score_A, value.score_B, value.score_C, value.score_D]
        );


        return successResponse({
            res,
            data: { id: (result as any).insertId, ...value },
            message: 'Match created successfully',
            statusCode: 201
        })
    } catch (err) {
        return errorResponse({ res, error: err });
    }
};

export const getAllMatches = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.execute(`
            SELECT 
                am.*, 
                uA.uniName AS team_A_name, uA.image AS team_A_image, uA.color_code AS team_A_color,
                uB.uniName AS team_B_name, uB.image AS team_B_image, uB.color_code AS team_B_color,
                uC.uniName AS team_C_name, uC.image AS team_C_image, uC.color_code AS team_C_color,
                uD.uniName AS team_D_name, uD.image AS team_D_image, uD.color_code AS team_D_color,
                l.name AS location_name
            FROM athletics_matches am
            JOIN universities uA ON am.team_A_id = uA.id
            JOIN universities uB ON am.team_B_id = uB.id
            JOIN universities uC ON am.team_C_id = uC.id
            JOIN universities uD ON am.team_D_id = uD.id
            JOIN locations l ON am.locationId = l.id
        `);

        return successResponse({ res, data: groupMatchesByEvent(rows as any), message: 'All matches fetched successfully' });
    } catch (err) {
        return errorResponse({ res, error: err });
    }
};

export const getMatchByEvent = async (req: Request, res: Response) => {
    const { event } = req.params

    if (!event) {
        return errorResponse({ res, error: 'Event query parameter is required' });
    }

    if (!['100m_male', '100m_female', '400m_male', '400m_female'].includes(event as string)) {
        return errorResponse({ res, error: 'Invalid event type. Please use [100m_male, 100m_female, 400m_male, 400m_female] instead' });
    }

    try {
        const matches = await AthleticService.getMatchByEvent(event as string);

        if (matches.length === 0) {
            return errorResponse({ res, error: 'Match not found', statusCode: 404 });
        }

        return successResponse({ res, data: groupMatchesByEvent(matches), message: 'Matches fetched successfully' });
    } catch (err) {
        return errorResponse({ res, error: err });
    }
};

export const getMatchById = async (req: Request, res: Response) => {
    try {
        const matches = await AthleticService.getMatchById(req.params.id);

        if (matches.length === 0) {
            return errorResponse({ res, error: 'Match not found', statusCode: 404 });
        }

        return successResponse({ res, data: groupMatchesByEvent(matches), message: 'Match fetched successfully' });
    } catch (err) {
        return errorResponse({ res, error: err });
    }
};

export const updateMatch = async (req: Request, res: Response) => {
    const { error, value } = updateAthleticsMatchDTO.validate(req.body);
    if (error) return res.status(400).json({ error: error.details });

    const existedMatch = await AthleticService.getMatchByEvent(value.event);

    if (!existedMatch) {
        return errorResponse({ res, error: 'Match not found', statusCode: 404 });
    }

    // TODO: Validate University & Location IDs

    try {
        await pool.execute(
            'UPDATE athletics_matches SET event = ?, team_A_id = ?, team_B_id = ?, team_C_id = ?, team_D_id = ?, time = ?, locationId = ?, score_A = ?, score_B = ?, score_C = ?, score_D = ? WHERE id = ?',
            [value.event, value.team_A_id, value.team_B_id, value.team_C_id, value.team_D_id, value.time, value.locationId, value.score_A, value.score_B, value.score_C, value.score_D, req.params.id]
        );

        return successResponse({ res, data: { id: req.params.id, ...value }, message: 'Match updated successfully' });
    } catch (err) {
        return errorResponse({ res, error: err });
    }
};

export const deleteMatch = async (req: Request, res: Response) => {
    const [rows] = await pool.execute('SELECT * FROM athletics_matches WHERE id = ?', [req.params.id]);

    if ((rows as AthleticsMatch[]).length === 0) return errorResponse({ res, error: 'Match not found', statusCode: 404 });

    try {
        await pool.execute('DELETE FROM athletics_matches WHERE id = ?', [req.params.id]);
        return successResponse({ res, data: null, message: 'Match deleted successfully' });
    } catch (err) {
        return errorResponse({ res, error: err });
    }
};