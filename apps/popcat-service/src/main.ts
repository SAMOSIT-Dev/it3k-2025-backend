import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectRedis } from './config/redis';
import { setupWebSocket } from './websocket/websocket.controller';
import cors from 'cors'

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Adjust to allow only specific origins
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true // If you need cookies or credentials in your requests
    },
    path: '/popcat/socket/',
});

const PORT = process.env.PORT || 8086;

app.use(cors())
app.use(express.json());

connectRedis().then(() => {
    setupWebSocket(io);
    server.listen(PORT, () => {
        console.log(`WebSocket server running on port ${PORT}`);
    });
})
