import { Request, Response } from "express";
import { createBadmintonMatchDTO, updateBadmintonMatchDTO } from "../dto/badmintonMatch.dto";
import { ResultSetHeader } from "mysql2";
import { pool } from "../database/database";

export const createBadmintonMatch = async (req: Request, res: Response) => {
    try {
        const { error } = createBadmintonMatchDTO.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { type, team_A_id, team_B_id, time, locationId } = req.body;

        const query = `INSERT INTO badminton_matches (type, team_A_id, team_B_id, time, locationId) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await pool.query<ResultSetHeader>(query, [type, team_A_id, team_B_id, time, locationId]);

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

export const updateBadmintonMatch = async (req: Request, res: Response) => {
    try {
        const { error } = updateBadmintonMatchDTO.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { id } = req.params;
        const { type, team_A_id, team_B_id, time, locationId } = req.body;

        const query = `UPDATE badminton_matches SET type = ?, team_A_id = ?, team_B_id = ?, time = ?, locationId = ? WHERE id = ?`;
        const [result] = await pool.query<ResultSetHeader>(query, [type, team_A_id, team_B_id, time, locationId, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Match not found' });
        }

        res.status(200).json({ success: true, message: 'Badminton match updated successfully' });
    } catch (error) {
        console.error('Error updating match:', error);
        res.status(500).json({ success: false, message: 'Error updating match' });
    }
};
