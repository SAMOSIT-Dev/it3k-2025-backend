import { Request, Response } from "express";
import { createBasketballDTO, updateBasketballMatchDTO, updateBasketballScoreDTO } from "../dto/basketballMatch.dto";
import { ResultSetHeader } from "mysql2";
import { pool } from "../database/database";

export const createBasketballMatch = async (req: Request, res: Response) => {
    try {
        const { error } = createBasketballDTO.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const { team_A_id, team_B_id, time, locationId } = req.body;
        const query = `INSERT INTO basketball_matches (team_A_id, team_B_id, time, locationId) VALUES (?, ?, ?, ?)`;
        const [result] = await pool.query<ResultSetHeader>(query, [team_A_id, team_B_id, time, locationId]);
        res.status(201).json({
            success: true,
            message: 'Basketball match created successfully',
            data: { id: result.insertId, team_A_id, team_B_id, time, locationId, },
        });

    } catch (error) {
        console.error('Error creating basketball match:', error);
        res.status(500).json({ success: false, message: 'Error creating basketball match' });
    }
}

export const updateBasketballMatch = async (req: Request, res: Response) => {
    try {
        const { error } = updateBasketballMatchDTO.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const { id } = req.params;
        const { team_A_id, team_B_id, time, locationId, status } = req.body;
        const query = `UPDATE basketball_matches SET team_A_id = ?, team_B_id = ?, time = ?, locationId = ?, status = ? WHERE id = ?`;
        const [result] = await pool.query<ResultSetHeader>(query, [team_A_id, team_B_id, time, locationId, status, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Basketball match not found' });
        }
        res.status(200).json({ success: true, message: 'Basketball match updated successfully' });
        
    } catch (error) {
        console.error('Error updating basketball match:', error);
        res.status(500).json({ success: false, message: 'Error updating basketball match' });
    }
}

export const updateBasketballScore = async (req: Request, res: Response) => {
    try {
        const { error } = updateBasketballScoreDTO.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const { id } = req.params;
        const { score_A_Q1, score_A_Q2, score_B_Q1, score_B_Q2, score_A_OT, score_B_OT } = req.body;
        const query = `UPDATE basketball_matches SET score_A_Q1 = ?, score_A_Q2 = ?, score_B_Q1 = ?, score_B_Q2 = ?, score_A_OT = ?, score_B_OT = ? WHERE id = ?`;
        const [result] = await pool.query<ResultSetHeader>(query, [score_A_Q1, score_A_Q2, score_B_Q1, score_B_Q2, score_A_OT, score_B_OT, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Basketball match not found' });
        }
        res.status(200).json({ success: true, message: 'Basketball score updated successfully' });
    } catch (error) {
        console.error('Error updating basketball score:', error);
        res.status(500).json({ success: false, message: 'Error updating basketball score' });
    }
}

export const deleteBasketballMatch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM basketball_matches WHERE id = ?`;
        const [result] = await pool.query<ResultSetHeader>(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Basketball match not found' });
        }
        res.status(200).json({ success: true, message: 'Basketball match deleted successfully' });
    } catch (error) {
        console.error('Error deleting basketball match:', error);
        res.status(500).json({ success: false, message: 'Error deleting basketball match' });
    }
}