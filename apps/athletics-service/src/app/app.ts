import express from 'express';
import * as path from 'path';
import {pool, checkDbConnection} from '../database/database';
import { Response } from 'express';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/health', checkDbConnection, async (req,res : Response) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM users');
        res.json(rows);
      } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
      }
})

export default app;


