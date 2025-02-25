import express from "express";
import http from "http";
import { Server } from "socket.io";
import { setupSocket } from "../sockets/basketball.socket";
import healthRoute from '../routes/health.route';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS || "*",
  },
  path: "/api/basketball-service/socket",
});

app.use('/', healthRoute);

setupSocket(io);

export { app, server };
