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
      success: true,
      message: `Pingpong matches fetched successfully`,
      data: matches,
    });
  } catch (error) {
    console.error(`Error fetching matches: `, error);
    res.status(500).json({
      success: false,
      message: `Error fetching matches`,
      data: [],
    });
  }
};

export const getPingpongMatchesByType = async (req: Request, res: Response) => {
  try {
    let { type } = req.params;
    type = type.toLowerCase();
    if (!(type in PingpongType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid pingpong type: ${type}. Using this format: single_female`,
        data: [],
      });
    }

    const query = `SELECT m.*, l.name AS locationName, 
      JSON_OBJECT("id", uA.id, "name", uA.uniName, "image", uA.image, "color_code", uA.color_code) AS team_A_details,
      JSON_OBJECT("id", uB.id, "name", uB.uniName, "image", uB.image, "color_code", uB.color_code) AS team_B_details,
      JSON_ARRAYAGG(
        JSON_OBJECT("id", s.id, "pingpong_match_id", s.pingpong_match_id, "round", s.round, "score_A", s.score_A, "score_B", s.score_B)
      ) AS pingpong_sets
      FROM pingpong_matches AS m JOIN locations l ON m.locationId = l.id JOIN universities uA ON m.team_A_id = uA.id
      JOIN universities uB ON m.team_B_id = uB.id LEFT JOIN pingpong_sets s ON m.id = s.pingpong_match_id WHERE m.type = ?
      GROUP BY m.id`;
    const [matches] = await pool.query<RowDataPacket[]>(query, [type]);

    if (!matches) {
      return res.status(404).json({
        success: false,
        message: `No pingpong matches found for type: ${type}`,
        data: [],
      });
    }
    const result: PingpongMatch[] = matches.map((match) => ({
      id: match.id,
      type: match.type as PingpongType,
      team_A_id: match.team_A_id,
      team_B_id: match.team_B_id,
      time: match.time,
      locationId: match.locationId,
      locationName: match.locationName,
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
      pingpong_sets: match.pingpong_sets.map((set) => ({
        id: set.id,
        pingpong_match_id: set.pingpong_match_id,
        round: set.round,
        score_A: set.score_A,
        score_B: set.score_B,
      })),
    }));

    res.status(200).json({
      success: true,
      message: `Pingpong matches for ${type} fetched successfully`,
      data: result,
    });
  } catch (error) {
    console.error(`Error fetching ${req.params.type} matches: `, error);
    res.status(500).json({
      success: false,
      message: `Error fetching ${req.params.type} matches`,
      data: [],
    });
  }
};