import { Request, Response } from 'express';
import { pool } from '../database/database';
import { errorResponse, successResponse } from '../utils/apiResponse';
import { groupMatchesByEvent } from '../utils/mapper';
import AthleticService from '../services/athletics.service';


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
