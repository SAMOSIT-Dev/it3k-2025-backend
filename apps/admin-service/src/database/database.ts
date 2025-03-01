import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3308'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'it3k-2025',
  waitForConnections: true,
};

export const pool = mysql.createPool(dbConfig);

export const checkDbConnection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
    next();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
};


export const closePool = async (): Promise<void> => {
  try {
    await pool.end();
    console.log('Pool connections closed.');
  } catch (error) {
    console.error('Error closing pool connections:', error);
    throw error;
  }
};
