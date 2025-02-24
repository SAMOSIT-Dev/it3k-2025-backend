import {Router} from 'express';
import {checkDbConnection, pool} from '../database/database';
import {Response, Request} from 'express';
import { HealthCheckResponse, Status } from '@it3k-2025-backend/shared';

const router = Router();

router.get('/db-query', checkDbConnection, async (req : Request,res : Response) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM universities');
        res.json(rows);
      } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Failed to fetch universities' });
      }
})

router.get('/health', (req : Request,res : Response) => {
    const response: HealthCheckResponse = {
        status: Status.UP,
        message: 'Pingpong service is running on port 8085',
        is_connected: true,
        timeStamp: new Date().toISOString()
    }
    res.status(200).json(response);
})

export default router;