import express from "express";
import http from "http";
import { Server } from "socket.io";
import { setupSocket } from "../sockets/basketball.socket";
import healthRoute from "../routes/health.route";
import createBasketBallRouter from "../routes/bassketball.route";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS || "*",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

app.use('/', healthRoute);
app.use('/api/basketball', createBasketBallRouter(io));

setupSocket(io);

export { app, server };
