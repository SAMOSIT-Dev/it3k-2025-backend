import { ResultSetHeader } from "mysql2";
import { pool } from "../database/database";
import { Request, Response } from "express";
import { createPingPongMatchDTO, createPingPongSetDTO, updatePingPongMatchDTO, updatePingPongSetDTO } from "../dto/pingpongMatch.dto";

export const createPingpongMatch = async (req: Request, res: Response) => {
    try {
        const { error } = createPingPongMatchDTO.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { type, team_A_id, team_B_id, time, locationId, teamId } = req.body;

        const query = `INSERT INTO pingpong_matches (type, team_A_id, team_B_id, time, locationId, teamId) VALUES (?, ?, ?, ?, ?, ?)`;
        const [result] = await pool.query<ResultSetHeader>(query, [type, team_A_id, team_B_id, time, locationId, teamId]);

        res.status(201).json({
            success: true,
            message: 'Pingpong match created successfully',
            data: { id: result.insertId, type, team_A_id, team_B_id, time, locationId },
        });
    } catch (error) {
        console.error('Error creating match:', error);
        res.status(500).json({ success: false, message: 'Error creating match' });
    }
};

export const createPingpongSet = async (req: Request, res: Response) => {
    try {
        const { error } = createPingPongSetDTO.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { pingpong_match_id, round, score_A, score_B } = req.body;

        const query = `INSERT INTO pingpong_sets (pingpong_match_id, round, score_A, score_B) VALUES (?, ?, ?, ?)`;
        const [result] = await pool.query<ResultSetHeader>(query, [pingpong_match_id, round, score_A, score_B]);

        res.status(201).json({
            success: true,
            message: 'Pingpong set created successfully',
            data: { id: result.insertId, pingpong_match_id, round, score_A, score_B },
        });
    } catch (error) {
        console.error('Error creating set:', error);
        res.status(500).json({ success: false, message: 'Error creating set' });
    }
};

export const updatePingpongMatch = async (req: Request, res: Response) => {
    try {
        const { error } = updatePingPongMatchDTO.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { id } = req.params;
        const { type, team_A_id, team_B_id, time, locationId } = req.body;

        const query = `UPDATE pingpong_matches SET type = ?, team_A_id = ?, team_B_id = ?, time = ?, locationId = ? WHERE id = ?`;
        const [result] = await pool.query<ResultSetHeader>(query, [type, team_A_id, team_B_id, time, locationId, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Match not found' });
        }

        res.status(200).json({ success: true, message: 'Pingpong match updated successfully' });
    } catch (error) {
        console.error('Error updating match:', error);
        res.status(500).json({ success: false, message: 'Error updating match' });
    }
};

export const updatePingpongSet = async (req: Request, res: Response) => {
    try {
        const { error } = updatePingPongSetDTO.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { id } = req.params;
        const { round, score_A, score_B } = req.body;

        const query = `UPDATE pingpong_sets SET round = ?, score_A = ?, score_B = ? WHERE id = ?`;
        const [result] = await pool.query<ResultSetHeader>(query, [round, score_A, score_B, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Set not found' });
        }

        res.status(200).json({ success: true, message: 'Pingpong set updated successfully' });
    } catch (error) {
        console.error('Error updating set:', error);
        res.status(500).json({ success: false, message: 'Error updating set' });
    }
};
