import express from 'express';
<<<<<<< HEAD
import * as path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
=======
>>>>>>> feature/docker-deploy
import basketballRoutes from '../routes/basketball.route';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS || '*',
  },
});

app.use(express.json());
app.use('/api/basketball', basketballRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

export { app, server, io };
