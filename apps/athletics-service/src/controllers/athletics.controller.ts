import { Request, Response } from 'express';
import { pool } from '../database/database';
import { AthleticsMatch } from '../model/athleticsMatch.model';
import { errorResponse, successResponse } from '../utils/apiResponse';


export const getAllMatches = async (_req: Request, res: Response) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM athletics_matches');
        return successResponse({ res, data: rows, message: 'All matches fetched successfully' });
    } catch (err) {
        return errorResponse({ res, error: err });
    }
};

export const getMatchByEvent = async (req: Request, res: Response) => {
    const { event } = req.params;
    if (!event) {
        return errorResponse({ res, error: 'Event query parameter is required' });
    }

    try {
        const [rows] = await pool.execute('SELECT * FROM athletics_matches WHERE event = ?', [event]);
        return successResponse({ res, data: rows, message: 'Matches fetched successfully' });
    } catch (err) {
        return errorResponse({ res, error: err });
    }
};

export const getMatchById = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM athletics_matches WHERE id = ?', [req.params.id]);
        if ((rows as AthleticsMatch[]).length === 0) return errorResponse({ res, error: 'Match not found', statusCode: 404 });

        return successResponse({ res, data: (rows as AthleticsMatch[])[0], message: 'Match fetched successfully' });
    } catch (err) {
        return errorResponse({ res, error: err });
    }
};
