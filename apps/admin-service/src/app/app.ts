import express from 'express';
import http from "http"
import healthRoute from '../routes/health.route';
import adminLoginRoute from '../routes/admin-auth.route';
import badmintonRoute from '../routes/badminton.route';
import pingpongRoute from '../routes/pingpong.route';
import cors from 'cors';
import helmet from 'helmet';
import scheduleRoute from '../routes/schedule.route'
import footballRoute from '../routes/football.route'
import basketballRoute from '../routes/basketball.route'
import { Server } from 'socket.io';
import { setupWebSocket as setupFootballSocket } from '../websocket/football.socket';
import { setupWebSocket as setupBasketballSocket } from '../websocket/basketball.socket';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.ALLOWED_ORIGINS || "*",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    },
    path: '/api/admin-service/socket'
});

app.use(express.json());
app.use(cors(
    {
        origin: '*',
        credentials: true
    }
));
app.use(helmet());

app.use('/', healthRoute);
app.use('/api/auth', adminLoginRoute);
app.use('/api/admin/badminton', badmintonRoute)
app.use('/api/admin/pingpong', pingpongRoute)
app.use('/api/admin/schedule', scheduleRoute)
app.use('/api/admin/football', footballRoute)
app.use('/api/admin/basketball', basketballRoute)

setupFootballSocket(io);
setupBasketballSocket(io);

export default app;


