import express, { Response } from 'express';
import adminRouter from '../routes/admin.route' 
import athleticsRouter from '../routes/athletics.route' 
import footballRouter from '../routes/football.route' 
import badmintonRouter from '../routes/badminton.route' 
import basketballRouter from '../routes/basketball.route' 
import pingpongRouter from '../routes/pingpong.route'
import { HealthCheckResponse, Status } from '@it3k-2025-backend/shared';

const app = express();
app.use('/admin', adminRouter);
app.use('/athletics', athleticsRouter);
app.use('/football', footballRouter);
app.use('/badminton', badmintonRouter);
app.use('/basketball', basketballRouter);
app.use('/pingpong', pingpongRouter);
app.get('/gateway/health', (req, res : Response) => {
    const response: HealthCheckResponse = {
        status: Status.UP,
        message: 'Gateway is running',
        is_connected: true,
        timeStamp: new Date().toISOString()
    }
    res.status(200).json(response);
})


export default app;