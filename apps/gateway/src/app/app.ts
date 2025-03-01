import express, { Response } from 'express';
import adminRouter from '../routes/admin.route'
import athleticsRouter from '../routes/athletics.route'
import badmintonRouter from '../routes/badminton.route'
import pingpongRouter from '../routes/pingpong.route'
import basketballSocketProxyRoutes from '../routes/socket/basketball.socket.proxy';
import footballSocketProxyRoutes from '../routes/socket/football.socket.proxy'
import popcatSocketProxyRoutes from '../routes/socket/popcat.socket.proxy'
import footballRouter from '../routes/football.route'
import scheduleRouter from '../routes/schedule.route'
import { HealthCheckResponse, Status } from '@it3k-2025-backend/shared';

const app = express();
app.use('/admin', adminRouter);
app.use('/athletics', athleticsRouter);
app.use('/badminton', badmintonRouter);
/**
 client use const socketInstance = io("http://localhost:8099/basketball/socket", {
  transports: ["websocket"]
});
 */
app.use('/basketball', basketballSocketProxyRoutes);
app.use('/popcat', popcatSocketProxyRoutes);
app.use('/football', footballSocketProxyRoutes);
app.use('/football', footballRouter);
app.use('/pingpong', pingpongRouter);
app.use('/schedule', scheduleRouter);
app.get('/gateway/health', (req, res: Response) => {
    const response: HealthCheckResponse = {
        status: Status.UP,
        message: 'Gateway is running',
        is_connected: true,
        timeStamp: new Date().toISOString()
    }
    res.status(200).json(response);
})


export default app;