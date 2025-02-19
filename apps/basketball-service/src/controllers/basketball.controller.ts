import { Request, Response } from 'express';
import pool from '../databases/database';
import { Scoreboard } from '../models/basketball.model';

export const getScoreboard = async (_req: Request, res: Response) => {
  try {
    const [matches]: any = await pool.query(
      `SELECT id, team_A_id, team_B_id, status, time, 
              score_A_Q1, score_A_Q2, score_B_Q1, score_B_Q2, 
              score_A_OT, score_B_OT
       FROM matches`
    );

    const scoreboard: Scoreboard[] = matches as Scoreboard[];

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
