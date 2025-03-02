import { Response, Request } from 'express';
import { pool } from '../database/database';

export const getPoints = async (_req: Request, res: Response) => {
  try {
    const query = `SELECT * from points`;
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
