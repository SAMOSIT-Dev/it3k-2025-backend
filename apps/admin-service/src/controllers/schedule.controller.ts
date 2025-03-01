import { Request, Response } from "express";
import { createScheduleDTO, updateScheduleDTO } from "../dto/schedule.dto";
import { ResultSetHeader } from "mysql2";
import { pool } from "../database/database";

export const createSchedule = async (req: Request, res: Response) => {
    try {
        const { error } = createScheduleDTO.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const { type, team_A_id, team_B_id, time, locationId } = req.body;

        const query = `INSERT INTO schedules (type, team_A_id, team_B_id, time, locationId) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await pool.query<ResultSetHeader>(query, [type, team_A_id, team_B_id, time, locationId]);

        res.status(201).json({
            success: true,
            message: 'Schedule created successfully',
            data: { id: result.insertId, type, team_A_id, team_B_id, time, locationId },
        });
    }
    catch (error) {
        console.error('Error creating schedule:', error);
        res.status(500).json({ success: false, message: 'Error creating schedule' });
    }
}

export const updateSchedule = async (req: Request, res: Response) => {
    try {
        const { error } = updateScheduleDTO.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const { id } = req.params;
        const { type, team_A_id, team_B_id, time, locationId } = req.body;

        const query = `UPDATE schedules SET type = ?, team_A_id = ?, team_B_id = ?, time = ?, locationId = ? WHERE id = ?`;
        const [result] = await pool.query<ResultSetHeader>(query, [type, team_A_id, team_B_id, time, locationId, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Schedule not found' });
        }

        res.status(200).json({ success: true, message: 'Schedule updated successfully' });

    } catch (error) {
        console.error('Error updating schedule:', error);
        res.status(500).json({ success: false, message: 'Error updating schedule' });
    }
}

export const deleteSchedule = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM schedules WHERE id = ?`;
        const [result] = await pool.query<ResultSetHeader>(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Schedule not found' });
        }
        res.status(200).json({ success: true, message: 'Schedule deleted successfully' });
    } catch (error) {
        console.error('Error deleting schedule:', error);
        res.status(500).json({ success: false, message: 'Error deleting schedule' });
    }
}