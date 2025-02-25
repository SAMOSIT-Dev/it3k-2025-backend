import { Response, Request } from 'express';
import { pool } from '../database/database';
import { PingpongMatch, PingpongType, UniversityDetail } from '../models/pingpong.model';

export const getPingpongMatches = async (_req: Request, res: Response) => {
  try {
    const matches = await pool.query('SELECT * FROM pingpong_matches');
    res.status(200).json({
      message: 'Pingpong matches fetched successfully',
      data: matches,
    });
  } catch (error) {
    console.error('Error fetching pingpong matches: ', error);
    res.status(500).json({
      message: 'Error fetching pingpong matches: ',
      error: error.message,
    });
  }
};

export const getPingpongMatchesByType = async (req: Request, res: Response) => {
  try {
    let { type } = req.params;
    type = type.toLowerCase();
    if (!(type in PingpongType)) {
      return res.status(400).json({ message: `Invalid pingpong type: ${type}` });
    }

    const query = 'SELECT * FROM pingpong_matches WHERE type = ?';
    const matches = await pool.query(query, [type]);
    console.log('Query:', query);
    console.log('Params:', [type]);
    
    res.status(200).json({
      message: `Pingpong matches for ${type} fetched successfully`,
      data: matches,
    });
  } catch (error) {
    console.error(`Error fetching ${req.params.type} matches: `, error);
    res.status(500).json({
      message: `Error fetching ${req.params.type} matches`,
      error: error.message,
    });
  }
};