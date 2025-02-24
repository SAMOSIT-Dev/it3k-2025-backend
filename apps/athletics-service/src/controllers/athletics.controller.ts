import { Request, Response } from 'express';
import { pool } from '../database/database';
import { athleticsMatchSchema } from '../dto/athleticsMatch.model';

export const createMatch = async (req: Request, res: Response) => {
    const { error, value } = athleticsMatchSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details });

    try {
        const [result] = await pool.execute(
            'INSERT INTO athletics_matches (event, team_A_id, team_B_id, time, locationId, score_A, score_B) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [value.event, value.team_A_id, value.team_B_id, value.time, value.locationId, value.score_A, value.score_B]
        );
        res.status(201).json({ id: (result as any).insertId, ...value });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getAllMatches = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM athletics_matches');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getMatchByEvent = async (req: Request, res: Response) => {
    const { event } = req.query;
    if (!event) return res.status(400).json({ error: 'Event name is required' });
    try {
        const [rows] = await pool.execute('SELECT * FROM athletics_matches WHERE event = ?', [event]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const getMatchById = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM athletics_matches WHERE id = ?', [req.params.id]);
        if ((rows as any[]).length === 0) return res.status(404).json({ error: 'Match not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const updateMatch = async (req: Request, res: Response) => {
    const { error, value } = athleticsMatchSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details });
    try {
        await pool.execute(
            'UPDATE athletics_matches SET event = ?, team_A_id = ?, team_B_id = ?, time = ?, locationId = ?, score_A = ?, score_B = ? WHERE id = ?',
            [value.event, value.team_A_id, value.team_B_id, value.time, value.locationId, value.score_A, value.score_B, req.params.id]
        );
        res.json({ id: req.params.id, ...value });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteMatch = async (req: Request, res: Response) => {
    try {
        await pool.execute('DELETE FROM athletics_matches WHERE id = ?', [req.params.id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err });
    }
};