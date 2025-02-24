import { Server } from 'socket.io';
import { BasketballService } from '../services/basketball.service';

const basketballService = new BasketballService();

export const setupWebSocket = (io: Server) => {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('getScoreboard', async () => {
            await basketballService.sendScoreboard(io);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};
