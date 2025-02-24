import { app, server } from './app/app';
import { Server } from 'socket.io';
import { setupWebSocket } from './websockets/basketball.websocket';

const PORT = process.env.PORT || 8083;
const io = new Server(server, {
    cors: {
      origin: process.env.ALLOWED_ORIGINS || '*',
    },
});

setupWebSocket(io);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing WebSocket server');
    io.close(() => {
        console.log('WebSocket server closed');
    });
});
