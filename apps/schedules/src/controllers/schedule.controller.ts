import { Request, Response } from "express";
import { pool } from '../database/database'
import { ScheduleRow, FormattedSchedule } from "../models/schedule.model";

export const getSchedules = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.execute<ScheduleRow[]>(`
            SELECT 
                s.id,
                s.type,
                s.time,
                s.team_A_id,
                s.team_B_id,
                s.locationId,
                ua.uniName as team_A_name,
                ua.image as team_A_image,
                ua.color_code as team_A_color,
                ub.uniName as team_B_name,
                ub.image as team_B_image,
                ub.color_code as team_B_color,
                l.name as location_name
            FROM schedules s
            JOIN universities ua ON s.team_A_id = ua.id
            JOIN universities ub ON s.team_B_id = ub.id
            JOIN locations l ON s.locationId = l.id
            ORDER BY s.time ASC
        `);

        const formattedRows: FormattedSchedule[] = rows.map((row: ScheduleRow) => ({
            scheduleId: row.id,
            type: row.type,
            time: row.time,
            location: {
                locationId: row.locationId,
                name: row.location_name
            },
            teamA: {
                teamId: row.team_A_id,
                name: row.team_A_name,
                image: row.team_A_image,
                colorCode: row.team_A_color
            },
            teamB: {
                teamId: row.team_B_id,
                name: row.team_B_name,
                image: row.team_B_image,
                colorCode: row.team_B_color
            }
        }));
        
        res.status(200).json(formattedRows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Failed to fetch schedules' });
    }
}

export const updateSchedule = async (req: Request, res: Response) => {
    const scheduleId = parseInt(req.params.id);
    const updateData = req.body
    try {
        const [schedules] = await pool.execute(
            'SELECT * FROM schedules WHERE id = ?',
            [scheduleId]
        );

        if (!schedules[0]) {
            return res.status(404).json({ error: 'Schedule not found' });
        }

        const currentSchedule = schedules[0];

        await pool.execute(
            `UPDATE schedules 
             SET type = ?, team_A_id = ?, team_B_id = ?, time = ?, locationId = ?
             WHERE id = ?`,
            [
                updateData.type !== undefined ? updateData.type : currentSchedule.type,
                updateData.team_A_id !== undefined ? updateData.team_A_id : currentSchedule.team_A_id,
                updateData.team_B_id !== undefined ? updateData.team_B_id : currentSchedule.team_B_id,
                updateData.time !== undefined ? updateData.time : currentSchedule.time,
                updateData.locationId !== undefined ? updateData.locationId : currentSchedule.locationId,
                scheduleId
            ]
        );

        res.status(200).json({ message: 'Schedule updated successfully', scheduleId, currentSchedule });
        
    } catch (error) {
        console.error('Error executing update:', error);
        res.status(500).json({ error: 'Failed to updated schedule' });
    }
    
}