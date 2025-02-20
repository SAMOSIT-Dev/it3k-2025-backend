import { Request, Response } from 'express';
import pool from '../databases/database';
import { Match, Schedule } from '../models/basketball.model';

export const getScoreboard = async (_req: Request, res: Response) => {
  try {
    const [matches]: any = await pool.query(
      `SELECT id, team_A_id, team_B_id, status, timeStart, timeEnd,  
              score_A_Q1, score_A_Q2, score_B_Q1, score_B_Q2, 
              score_A_OT, score_B_OT
       FROM Basketball_Match`
    );

    const scoreboard: Match[] = matches as Match[];

    res.json({
      message: 'Scoreboard fetched successfully',
      data: scoreboard
    });
  } catch (error) {
    console.error('Error fetching scoreboard:', error);
    res.status(500).json({
      message: 'Failed to fetch scoreboard',
      error: error.message
    });
  }
};

export const getSchedule = async (_req: Request, res: Response) => {
  try {
    const [matches]: any = await pool.query(
      `SELECT id, team_A_id, team_B_id, status, timeStart, timeEnd
       FROM Basketball_Match`
    );

    const schedule: Schedule[] = matches as Schedule[];

    res.json({
      message: 'Schedule fetched successfully',
      data: schedule
    });
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({
      message: 'Failed to fetch schedule',
      error: error.message
    });
  }
};