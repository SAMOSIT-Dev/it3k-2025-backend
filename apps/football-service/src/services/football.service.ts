import { Server } from 'socket.io';
import { pool } from '../database/database';
import { ScoreBoard, Match } from '../models/football.model';
import { getWinLoseScore, getPoint, getPointDiff } from '../utils/calculateScore';

const getScoreboard = async (): Promise<ScoreBoard[]> => {
  try {
    // Fetch all finished football matches
    const [matches] = await pool.execute<any[]>(`
      SELECT
        fm.id, fm.team_A_id, fm.team_B_id, fm.score_A, fm.score_B,
        uA.uniName AS team_A_name, uA.image AS team_A_image, uA.color_code AS team_A_color,
        uB.uniName AS team_B_name, uB.image AS team_B_image, uB.color_code AS team_B_color
      FROM football_matches fm
      JOIN universities uA ON fm.team_A_id = uA.id
      JOIN universities uB ON fm.team_B_id = uB.id
      WHERE fm.status = 'finished'
      ORDER BY fm.id ASC
    `);

    // Create a map to track team statistics
    const teamStats: { [key: number]: ScoreBoard } = {};

    matches.forEach((match) => {
      const teams = [
        {
          id: match.team_A_id,
          uniName: match.team_A_name,
          image: match.team_A_image,
          color_code: match.team_A_color,
          score: match.score_A,
          opponentScore: match.score_B,
        },
        {
          id: match.team_B_id,
          uniName: match.team_B_name,
          image: match.team_B_image,
          color_code: match.team_B_color,
          score: match.score_B,
          opponentScore: match.score_A,
        },
      ];

      teams.forEach((team) => {
        if (!teamStats[team.id]) {
          teamStats[team.id] = {
            id: team.id,
            team: {
              uniName: team.uniName,
              image: team.image,
              color_code: team.color_code,
            },
            win_lose: '0-0-0',
            point: '0-0',
            point_diff: 0,
          };
        }

        // Update match results
        teamStats[team.id].win_lose = getWinLoseScore(teamStats[team.id].win_lose, team.score, team.opponentScore);
        teamStats[team.id].point = getPoint(teamStats[team.id].point, team.score, team.opponentScore);
        teamStats[team.id].point_diff = getPointDiff(teamStats[team.id].point_diff, team.score, team.opponentScore);
      });
    });

    // Convert map values to array and sort by wins and point diff
    return Object.values(teamStats).sort((a, b) => {
      const [aWins] = a.win_lose.split('-').map(Number);
      const [bWins] = b.win_lose.split('-').map(Number);

      return bWins - aWins || b.point_diff - a.point_diff;
    });

  } catch (error) {
    console.error('Error fetching scoreboard:', error);
    return [];
  }
};

const sendScoreboard = async (io: Server) => {
  try {
    const scoreboard = await getScoreboard();
    io.emit('updateScoreboard', scoreboard);
  } catch (error) {
    console.error('Error sending scoreboard:', error);
  }
};

const getOpeningMatch = async (): Promise<Match[]> => {
  try {
    // Fetch all finished football matches
    const [matches] = await pool.execute<any[]>(`
      SELECT
        fm.id, fm.team_A_id, fm.team_B_id, fm.status, fm.score_A, fm.score_B,
        DATE_FORMAT(fm.timeStart, '%H:%i:%s') AS timeStart,
        DATE_FORMAT(fm.timeEnd, '%H:%i:%s') AS timeEnd,
        uA.uniName AS team_A_name, uA.image AS team_A_image, uA.color_code AS team_A_color,
        uB.uniName AS team_B_name, uB.image AS team_B_image, uB.color_code AS team_B_color
      FROM football_matches fm
      JOIN universities uA ON fm.team_A_id = uA.id
      JOIN universities uB ON fm.team_B_id = uB.id
      WHERE fm.status = 'ongoing' OR fm.status = 'break'
      ORDER BY fm.id ASC
    `);

    return matches.map((match) => ({
      id: match.id,
      team_A: {
        uniName: match.team_A_name,
        image: match.team_A_image,
        color_code: match.team_A_color,
        score: match.score_A ?? 0,
      },
      team_B: {
        uniName: match.team_B_name,
        image: match.team_B_image,
        color_code: match.team_B_color,
        score: match.score_B ?? 0,
      },
      status: match.status,
      timeStart: match.timeStart,
      timeEnd: match.timeEnd
    }));

  } catch (error) {
    console.error('Error fetching scoreboard:', error);
    return [];
  }
};

const sendOpeningMatch = async (io: Server) => {
  try {
    const openingMatches = await getOpeningMatch();
    io.emit("updateOpeningMatch", openingMatches);
  } catch (error) {
    console.error("Error sending opening match updates:", error);
  }
};


export { getScoreboard, sendScoreboard, getOpeningMatch, sendOpeningMatch };
