import { Response, Request } from 'express';
import { pool } from '../database/database';
import {
  PingpongMatch,
  PingpongType,
  UniversityDetail,
} from '../models/pingpong.model';
import { RowDataPacket } from 'mysql2';

export const getPingpongMatches = async (_req: Request, res: Response) => {
  try {
    const query = `SELECT * from pingpong_matches`;
    const [matches] = await pool.query(query);

    res.status(200).json({
      message: `Pingpong matches fetched successfully`,
      data: matches,
    });
  } catch (error) {
    console.error(`Error fetching matches: `, error);
    res.status(500).json({
      message: `Error fetching matches`,
      error: error.message,
    });
  }
};

export const getPingpongMatchesByType = async (req: Request, res: Response) => {
  try {
    let { type } = req.params;
    type = type.toLowerCase();
    if (!(type in PingpongType)) {
      return res.status(400).json({
        message: `Invalid pingpong type: ${type}. Using this format: single_female`,
      });
    }

    const query = `SELECT m.*, l.name AS locationName, 
      JSON_OBJECT("id", uA.id, "uniName", uA.uniName, "image", uA.image, "color_code", uA.color_code) AS team_A_details,
      JSON_OBJECT("id", uB.id, "uniName", uB.uniName, "image", uB.image, "color_code", uB.color_code) AS team_B_details,
      JSON_ARRAYAGG(JSON_OBJECT("id", s.id, "pingpong_match_id", s.pingpong_match_id, "round", s.round, "score_A", s.score_A, "score_B", s.score_B)) AS pingpong_sets
      FROM pingpong_matches AS m JOIN locations l ON m.locationId = l.id JOIN universities uA ON m.team_A_id = uA.id
      JOIN universities uB ON m.team_B_id = uB.id 
      LEFT JOIN pingpong_sets s ON s.pingpong_match_id = m.id
      WHERE m.type = ? GROUP BY m.id`;

    const [matches] = await pool.query<RowDataPacket[]>(query, [type]);

    if (!matches) {
      return res.status(404).json({
        message: `No pingpong matches found for type: ${type}`,
      });
    }
    const result: PingpongMatch[] = matches.map((match, index) => {
      let teamAWins = 0;
      let teamBWins = 0;

      const sets = match.pingpong_sets.map((set) => {
        if (set.score_A > set.score_B) {
          teamAWins++;
        } else if (set.score_B > set.score_A) {
          teamBWins++;
        }
        return {
          id: set.id,
          pingpong_match_id: set.pingpong_match_id,
          round: set.round,
          score_A: set.score_A,
          score_B: set.score_B,
        };
      });
      return {
        matchId: index + 1,
        id: match.id,
        type: match.type as PingpongType,
        team_A_id: match.team_A_id,
        team_B_id: match.team_B_id,
        time: match.time,
        locationId: match.locationId,
        locationName: match.locationName,
        team_A_number: match.team_A_number,
        team_B_number: match.team_B_number,
        team_A_details: {
          id: match.team_A_details.id,
          uniName: match.team_A_details.uniName,
          image: match.team_A_details.image,
          color_code: match.team_A_details.color_code,
        } as UniversityDetail,
        team_B_details: {
          id: match.team_B_details.id,
          uniName: match.team_B_details.uniName,
          image: match.team_B_details.image,
          color_code: match.team_B_details.color_code,
        } as UniversityDetail,
        pingpong_sets: sets,
        result_A: teamAWins,
        result_B: teamBWins,
      };
    });

    res.status(200).json({
      message: `Pingpong matches for ${type} fetched successfully`,
      data: result,
    });
  } catch (error) {
    console.error(`Error fetching ${req.params.type} matches: `, error);
    res.status(500).json({
      message: `Error fetching ${req.params.type} matches`,
      error: error.message,
    });
  }
};
