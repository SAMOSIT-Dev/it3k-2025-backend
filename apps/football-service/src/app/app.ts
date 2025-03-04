import express from "express";
import http from "http";
import { Server } from "socket.io";
import { setupSocket } from "../sockets/football.sockets";
import healthRoute from '../routes/health.route';
import footballRoutes from '../routes/football.route';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
