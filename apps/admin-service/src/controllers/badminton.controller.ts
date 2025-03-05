import { Request, Response } from "express";
import { createBadmintonMatchDTO, createBadmintonSetDTO, updateBadmintonMatchDTO, updateBadmintonSetDTO } from "../dto/badmintonMatch.dto";
import { ResultSetHeader } from "mysql2";
import { pool } from "../database/database";

export const createBadmintonMatch = async (req: Request, res: Response) => {
    try {
        const { error } = createBadmintonMatchDTO.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { type, team_A_id, team_B_id, time, locationId, team_A_number, team_B_number } = req.body;

        const query = `INSERT INTO badminton_matches (type, team_A_id, team_B_id, time, locationId, team_A_number, team_B_number) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await pool.query<ResultSetHeader>(query, [type, team_A_id, team_B_id, time, locationId, team_A_number, team_B_number]);

        res.status(201).json({
            success: true,
            message: 'Badminton match created successfully',
            data: { id: result.insertId, type, team_A_id, team_B_id, time, locationId },
        });
    } catch (error) {
        console.error('Error creating match:', error);
        res.status(500).json({ success: false, message: 'Error creating match' });
    }
};

export const createBadmintonSet = async (req: Request, res: Response) => {
    try {
        const { error } = createBadmintonSetDTO.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { badminton_match_id, round, score_A, score_B } = req.body;

        const query = `INSERT INTO badminton_sets (badminton_match_id, round, score_A, score_B) VALUES (?, ?, ?, ?)`;
        const [result] = await pool.query<ResultSetHeader>(query, [badminton_match_id, round, score_A, score_B]);

        res.status(201).json({
            success: true,
            message: 'Badminton set created successfully',
            data: { id: result.insertId, badminton_match_id, round, score_A, score_B },
        });
    } catch (error) {
        console.error('Error creating set:', error);
        res.status(500).json({ success: false, message: 'Error creating set' });
    }
};

export const updateBadmintonMatch = async (req: Request, res: Response) => {
    try {
        const { error } = updateBadmintonMatchDTO.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { id } = req.params;
        const { type, team_A_id, team_B_id, time, locationId, team_A_number, team_B_number } = req.body;

        const query = `UPDATE badminton_matches SET type = ?, team_A_id = ?, team_B_id = ?, time = ?, locationId = ?, team_A_number = ?, team_B_number = ? WHERE id = ?`;
        const [result] = await pool.query<ResultSetHeader>(query, [type, team_A_id, team_B_id, time, locationId, team_A_number, team_B_number, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Match not found' });
        }

        res.status(200).json({ success: true, message: 'Badminton match updated successfully' });
    } catch (error) {
        console.error('Error updating match:', error);
        res.status(500).json({ success: false, message: 'Error updating match' });
    }
};


export const updateBadmintonSet = async (req: Request, res: Response) => {
    try {
        const { error } = updateBadmintonSetDTO.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { id } = req.params;
        const { round, score_A, score_B } = req.body;

        const query = `UPDATE badminton_sets SET round = ?, score_A = ?, score_B = ? WHERE id = ?`;
        const [result] = await pool.query<ResultSetHeader>(query, [round, score_A, score_B, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Set not found' });
        }

        res.status(200).json({ success: true, message: 'Badminton set updated successfully' });
    } catch (error) {
        console.error('Error updating set:', error);
        res.status(500).json({ success: false, message: 'Error updating set' });
    }
};
