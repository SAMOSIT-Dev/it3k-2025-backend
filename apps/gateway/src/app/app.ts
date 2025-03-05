import express, { Response } from 'express';
import athleticsRouter from '../routes/athletics.route'
import badmintonRouter from '../routes/badminton.route'
import pingpongRouter from '../routes/pingpong.route'
import basketballSocketProxyRoutes from '../routes/socket/basketball.socket.proxy';
import footballSocketProxyRoutes from '../routes/socket/football.socket.proxy'
import popcatSocketProxyRoutes from '../routes/socket/popcat.socket.proxy'
import footballRouter from '../routes/football.route'
import scheduleRouter from '../routes/schedule.route'
import pointRouter from '../routes/point.route'
import authRouter from '../routes/admin/auth.route'
import adminBasketballRouter from '../routes/admin/basketball.route'
import adminFootballRouter from '../routes/admin/football.route'
import adminPingpongRouter from '../routes/admin/pingpong.route'
import adminBadmintonRouter from '../routes/admin/badminton.route'
import adminAthleticsRouter from '../routes/admin/athletics.route'
import e from 'express';

const app = express();
app.use('/athletics', athleticsRouter);
app.use('/badminton', badmintonRouter);
app.use('/basketball', basketballSocketProxyRoutes);
app.use('/popcat', popcatSocketProxyRoutes);
app.use('/football', footballSocketProxyRoutes);
app.use('/football', footballRouter);
app.use('/pingpong', pingpongRouter);
app.use('/schedule', scheduleRouter);
app.use('/points', pointRouter);

// Admin 
app.use(express.json());
app.use('/admin/auth', authRouter);
app.use('/admin/basketball', adminBasketballRouter);
app.use('/admin/football', adminFootballRouter);
app.use('/admin/pingpong', adminPingpongRouter);
app.use('/admin/badminton', adminBadmintonRouter);
app.use('/admin/athletics', adminAthleticsRouter);



export default app;