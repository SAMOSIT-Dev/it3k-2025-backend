import { Server } from 'socket.io';
import { pool } from '../databases/database';
import {
  ScoreBoardMatchRow,
  OpeningMatchesMatchRow,
  ScoreBoard,
  DashboardEntry,
  Match,
  
} from '../models/basketball.model';
import { getTotalScore } from '../utils/calculateScore';

const fetchOpeningMatch = async (): Promise<Match[]> => {
  try {
    const [rows] = await pool.execute<OpeningMatchesMatchRow[]>(`
      SELECT bm.id, bm.status, bm.timeStart, bm.timeEnd,
      ua.uniName AS team_A_name, ua.image AS team_A_image, ua.color_code AS team_A_color,
      ub.uniName AS team_B_name, ub.image AS team_B_image, ub.color_code AS team_B_color
      FROM basketball_matches bm
      JOIN universities ua ON bm.team_A_id = ua.id
      JOIN universities ub ON bm.team_B_id = ub.id
      WHERE bm.status = 'upcoming' OR bm.status = 'ongoing' OR bm.status = 'break'
      ORDER BY bm.timeStart ASC

    `);

    return rows.map((match) => ({
      id: match.id,
      team_A: {
        uniName: match.team_A_name,
        image: match.team_A_image,
        color_code: match.team_A_color,
      },
      team_B: {
        uniName: match.team_B_name,
        image: match.team_B_image,
        color_code: match.team_B_color,
      },
      status: match.status,
      timeStart: new Date(match.timeStart).toISOString(),
      timeEnd: new Date(match.timeEnd).toISOString(),
    }));

  } catch (error) {
    console.error('Error fetching opening match:', error);
    return [];
  }
}




const fetchScoreboard = async (): Promise<ScoreBoard[]> => {
  try {
    const [rows] = await pool.execute<ScoreBoardMatchRow[]>(`
      SELECT 
        bm.id, bm.status, bm.timeStart, bm.timeEnd,  
        bm.score_A_Q1, bm.score_A_Q2, bm.score_B_Q1, bm.score_B_Q2, 
        bm.score_A_OT, bm.score_B_OT,
        ua.uniName AS team_A_uniName, ua.image AS team_A_image, ua.color_code AS team_A_color,
        ub.uniName AS team_B_uniName, ub.image AS team_B_image, ub.color_code AS team_B_color
      FROM basketball_matches bm
      JOIN universities ua ON bm.team_A_id = ua.id
      JOIN universities ub ON bm.team_B_id = ub.id
    `);

    return rows.map((match) => ({
      id: match.id,
      team_A: {
        uniName: match.team_A_uniName,
        image: match.team_A_image,
        color_code: match.team_A_color,
        score_Q1: match.score_A_Q1,
        score_Q2: match.score_A_Q2,
        score_OT: match.score_A_OT,
        totalScore: getTotalScore(
          match.score_A_Q1,
          match.score_A_Q2,
          match.score_A_OT
        ),
      },
      team_B: {
        uniName: match.team_B_uniName,
        image: match.team_B_image,
        color_code: match.team_B_color,
        score_Q1: match.score_B_Q1,
        score_Q2: match.score_B_Q2,
        score_OT: match.score_B_OT,
        totalScore: getTotalScore(
          match.score_B_Q1,
          match.score_B_Q2,
          match.score_B_OT
        ),
      },
      status: match.status,
      timeStart: new Date(match.timeStart).toISOString(),
      timeEnd: new Date(match.timeEnd).toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching scoreboard:', error);
    return [];
  }
};

const fetchDashboard = async (): Promise<DashboardEntry[]> => {
  try {
    const [rows] = await pool.execute<ScoreBoardMatchRow[]>(`
      SELECT 
    ua.uniName AS university, 
    COALESCE(SUM(CASE 
        WHEN bm.team_A_id = ua.id AND bm.score_A_Q1 + bm.score_A_Q2 + bm.score_A_OT > bm.score_B_Q1 + bm.score_B_Q2 + bm.score_B_OT THEN 1
        WHEN bm.team_B_id = ua.id AND bm.score_B_Q1 + bm.score_B_Q2 + bm.score_B_OT > bm.score_A_Q1 + bm.score_A_Q2 + bm.score_A_OT THEN 1
        ELSE 0
    END), 0) AS wins,

    COALESCE(SUM(CASE 
        WHEN bm.team_A_id = ua.id AND bm.score_A_Q1 + bm.score_A_Q2 + bm.score_A_OT < bm.score_B_Q1 + bm.score_B_Q2 + bm.score_B_OT THEN 1
        WHEN bm.team_B_id = ua.id AND bm.score_B_Q1 + bm.score_B_Q2 + bm.score_B_OT < bm.score_A_Q1 + bm.score_A_Q2 + bm.score_A_OT THEN 1
        ELSE 0
    END), 0) AS losses,

    COALESCE(SUM(CASE 
        WHEN bm.team_A_id = ua.id THEN bm.score_A_Q1 + bm.score_A_Q2 + bm.score_A_OT
        WHEN bm.team_B_id = ua.id THEN bm.score_B_Q1 + bm.score_B_Q2 + bm.score_B_OT
        ELSE 0
    END), 0) AS totalPointsScored,

    COALESCE(SUM(CASE 
        WHEN bm.team_A_id = ua.id THEN bm.score_B_Q1 + bm.score_B_Q2 + bm.score_B_OT
        WHEN bm.team_B_id = ua.id THEN bm.score_A_Q1 + bm.score_A_Q2 + bm.score_A_OT
        ELSE 0
    END), 0) AS totalPointsConceded,

    COALESCE(SUM(CASE 
        WHEN bm.team_A_id = ua.id THEN bm.score_A_Q1 + bm.score_A_Q2 + bm.score_A_OT - (bm.score_B_Q1 + bm.score_B_Q2 + bm.score_B_OT)
        WHEN bm.team_B_id = ua.id THEN bm.score_B_Q1 + bm.score_B_Q2 + bm.score_B_OT - (bm.score_A_Q1 + bm.score_A_Q2 + bm.score_A_OT)
        ELSE 0
    END), 0) AS pointDiff
FROM universities ua
LEFT JOIN basketball_matches bm 
    ON (bm.team_A_id = ua.id OR bm.team_B_id = ua.id)
    AND bm.status = 'finished'
GROUP BY ua.uniName
ORDER BY wins DESC, pointDiff DESC;
    `);

    const processedData = rows.map((entry, index) => ({
      rank: index + 1,
      university: entry.university,
      wins: entry.wins,
      losses: entry.losses,
      totalPointsScored: entry.totalPointsScored,
      totalPointsConceded: entry.totalPointsConceded,
      pointDiff: entry.totalPointsScored - entry.totalPointsConceded,
    }));

    return processedData;
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    return [];
  }
};

const sendScoreboard = async (io: Server) => {
  try {
    const scoreboard = await fetchScoreboard();
    io.emit('updateScoreboard', scoreboard);
  } catch (error) {
    console.error('Error sending scoreboard:', error);
  }
};

const sendDashboard = async (io: Server) => {
  try {
    const dashboard = await fetchDashboard();
    io.emit('updateDashboard', dashboard);
  } catch (error) {
    console.error('Error sending dashboard:', error);
  }
};

const sendOpeningMatch = async (io: Server) => {
  try {
    const openingMatch = await fetchOpeningMatch();
    io.emit('updateOpeningMatch', openingMatch);
    console.log('Opening Match:', openingMatch);
  } catch (error) {
    console.error('Error sending openingMatch:', error);
  }
};

export { fetchScoreboard, fetchDashboard, fetchOpeningMatch, sendScoreboard, sendDashboard , sendOpeningMatch};
