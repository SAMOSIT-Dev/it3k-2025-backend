import express from "express";
import http from "http";
import { Server } from "socket.io";
import { setupSocket } from "../sockets/basketball.socket";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS || "*",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
  path: '/api/basketball-service/socket'
});


setupSocket(io);

export { app, server };
