import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectRedis } from './config/redis';
import { setupWebSocket } from './websocket/websocket.controller';


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.ALLOWED_ORIGINS || "*",
    },
});
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectRedis().then(() => {
    setupWebSocket(io);
    server.listen(PORT, () => {
        console.log(`WebSocket server running on port ${PORT}`);
    });
})
