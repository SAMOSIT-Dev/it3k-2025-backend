import express from "express";
import http from "http";
import { Server } from "socket.io";
import { setupSocket } from "../sockets/football.sockets";
import healthRoute from '../routes/health.route';
import footballRoutes from '../routes/football.route';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS || "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  },
  
  path: "/api/football-service/socket",
});

app.use('/', healthRoute);
app.use('/api/football', footballRoutes);

setupSocket(io);

export { app, server };
