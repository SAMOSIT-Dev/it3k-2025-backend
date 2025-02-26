//controllers/basketball.controller.ts
import { Request, Response } from 'express';
import pool from '../databases/database';
import { Match, BasketballMatchRow } from '../models/basketball.model';
import { formatTime } from '@it3k-2025-backend/shared'
import { getTotalScore } from '../utils/calculateScore';

export const fetchScoreboard = async (): Promise<Match[]> => {
  try {
    const [rows] = await pool.execute<BasketballMatchRow[]>(`
      SELECT 
        bm.id, 
        bm.status, 
        bm.timeStart, 
        bm.timeEnd,  
        bm.score_A_Q1, bm.score_A_Q2, bm.score_B_Q1, bm.score_B_Q2, 
        bm.score_A_OT, bm.score_B_OT,
        ua.uniName AS team_A_uniName, ua.image AS team_A_image, ua.color_code AS team_A_color,
        ub.uniName AS team_B_uniName, ub.image AS team_B_image, ub.color_code AS team_B_color
      FROM Basketball_Match bm
      JOIN University ua ON bm.team_A_id = ua.id
      JOIN University ub ON bm.team_B_id = ub.id
    `);

    return rows.map((match) => ({
      id: match.id,
      team_A: {
        uniName: match.team_A_uniName,
        image: match.team_A_image,
        color_code: match.team_A_color,
      },
      team_B: {
        uniName: match.team_B_uniName,
        image: match.team_B_image,
        color_code: match.team_B_color,
      },
      status: match.status,
      time: formatTime(match.timeStart, match.timeEnd),
      score_A_Q1: match.score_A_Q1,
      score_A_Q2: match.score_A_Q2,
      score_B_Q1: match.score_B_Q1,
      score_B_Q2: match.score_B_Q2,
      score_A_OT: match.score_A_OT,
      score_B_OT: match.score_B_OT,
      total_score_A: getTotalScore(match.score_A_Q1, match.score_A_Q2, match.score_A_OT),
      total_score_B: getTotalScore(match.score_B_Q1, match.score_B_Q2, match.score_B_OT),
    }));
  } catch (error) {
    console.error('Error fetching scoreboard:', error);
    return [];
  }
};
