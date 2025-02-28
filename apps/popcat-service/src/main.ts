import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectRedis } from './config/redis';
import { setupWebSocket } from './websocket/websocket.controller';
import { Request, Response } from 'express';
import { HealthCheckResponse, Status } from '@it3k-2025-backend/shared';


import cors from 'cors';

const app = express();

app.get('/health', (req : Request,res : Response) => {
    const response: HealthCheckResponse = {
        status: Status.UP,
        message: 'Popcat service (with web socket) is running on port 3000',
        is_connected: true,
        timeStamp: new Date().toISOString()
    }
    res.status(200).json(response);
})

const server = createServer(app);
const io = new Server(server, {
    cors: {
    origin: process.env.ALLOWED_ORIGINS || '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true, // If you need cookies or credentials in your requests
    },
    path: '/popcat/socket/',
});

const PORT = process.env.PORT || 8086;

app.use(cors());
app.use(express.json());

connectRedis().then(() => {
    setupWebSocket(io);
    server.listen(PORT, () => {
    console.log(`WebSocket server running on port ${PORT}`);
    });
});
