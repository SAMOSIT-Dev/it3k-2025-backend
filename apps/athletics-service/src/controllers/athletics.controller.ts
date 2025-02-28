import { Request, Response } from 'express';
import { pool } from '../database/database';
import { createAthleticsMatchDTO, updateAthleticsMatchDTO } from '../dto/athleticsMatch.model';
import { AthleticsMatch } from '../model/athleticsMatch.model';
import { errorResponse, successResponse, validationErrorResponse } from '../utils/apiResponse';

export const createMatch = async (req: Request, res: Response) => {
    const { error, value } = createAthleticsMatchDTO.validate(req.body);

    if (error) {
        return validationErrorResponse({ res, error_details: error.details });
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
        const [rows] = await pool.execute('SELECT * FROM athletics_matches');
        return successResponse({ res, data: rows, message: 'All matches fetched successfully' });
    } catch (err) {
        return errorResponse({ res, error: err });
    }
};

export const getMatchByEvent = async (req: Request, res: Response) => {
    const { event } = req.query;
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

export const updateMatch = async (req: Request, res: Response) => {
    const { error, value } = updateAthleticsMatchDTO.validate(req.body);
    if (error) return res.status(400).json({ error: error.details });

    const [rows] = await pool.execute('SELECT * FROM athletics_matches WHERE id = ?', [req.params.id]);

    if ((rows as AthleticsMatch[]).length === 0) return errorResponse({ res, error: 'Match not found', statusCode: 404 });

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