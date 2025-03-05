import { Request, Response } from "express";
import { createFootballDTO, updateFootballDTO, updateFootballScoreDTO } from "../dto/footballMatch.dto";
import { ResultSetHeader } from "mysql2";
import { pool } from "../database/database";

export const createFootballMatch = async (req: Request, res: Response) => {
    try {
        const { error } = createFootballDTO.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const { team_A_id, team_B_id, timeStart, timeEnd, locationId } = req.body;
        const query = `INSERT INTO football_matches (team_A_id, team_B_id, timeStart, timeEnd, locationId) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await pool.query<ResultSetHeader>(query, [team_A_id, team_B_id, timeStart, timeEnd, locationId]);
        res.status(201).json({
            success: true,
            message: 'Football match created successfully',
            data: { id: result.insertId, team_A_id, team_B_id, timeStart, timeEnd, locationId, },
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating football match' });
    }
}

export const updateFootballMatch = async (req: Request, res: Response) => {
    try {
        const { error } = updateFootballDTO.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const { id } = req.params;
        const { team_A_id, team_B_id, timeStart, timeEnd, locationId, score_A, score_B, status } = req.body;
        const query = `UPDATE football_matches SET team_A_id = ?, team_B_id = ?, timeStart = ?, timeEnd = ?, locationId = ?, score_A = ?, score_B = ?, status = ? WHERE id = ?`;
        const [result] = await pool.query<ResultSetHeader>(query, [team_A_id, team_B_id, timeStart, timeEnd, locationId, score_A, score_B, status, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Football match not found' });
        }
        res.status(200).json({ success: true, message: 'Football match updated successfully' });

    } catch (error) {
        console.error('Error updating football match:', error);
        res.status(500).json({ success: false, message: 'Error updating football match' });
    }
}

export const updateFootballScore = async (req: Request, res: Response) => {
    try {
        const { error } = updateFootballScoreDTO.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const { id } = req.params;
        const { score_A, score_B } = req.body;
        const query = `UPDATE football_matches SET score_A = ?, score_B = ? WHERE id = ?`;
        const [result] = await pool.query<ResultSetHeader>(query, [score_A, score_B, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Football match not found' });
        }
        res.status(200).json({ success: true, message: 'Football score updated successfully' });
    } catch (error) {
        console.error('Error updating football score:', error);
        res.status(500).json({ success: false, message: 'Error updating football score' });
    }
}

export const deleteFootballMatch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM football_matches WHERE id = ?`;
        const [result] = await pool.query<ResultSetHeader>(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Football match not found' });
        }
        res.status(200).json({ success: true, message: 'Football match deleted successfully' });
    } catch (error) {
        console.error('Error deleting football match:', error);
        res.status(500).json({ success: false, message: 'Error deleting football match' });
    }
}