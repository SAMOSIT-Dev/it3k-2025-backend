import { Response, Request } from 'express';
import { pool } from '../database/database';

export const getPoints = async (_req: Request, res: Response) => {
  try {
    const query = ` SELECT 
    points.id,
    universities.uniName AS universityName,
    points.basketball_points,
    points.football_points,
    points.pingpong_points,
    points.badminton_points,
    points.athletics_points
  FROM points 
  JOIN universities ON points.universityId = universities.id`;
    const [points] = await pool.query(query);

    res.status(200).json({
      success: true,
      message: `Points fetched successfully`,
      data: points,
    });
  } catch (error) {
    console.error(`Error fetching points: `, error);
    res.status(500).json({
      success: false,
      message: `Error fetching points`,
      data: [],
    });
  }
};
