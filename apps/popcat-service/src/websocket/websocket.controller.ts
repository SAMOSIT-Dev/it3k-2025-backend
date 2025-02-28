import { Server } from 'socket.io';
import { ClickService } from '../services/click.service';
import { LeaderboardService } from '../services/leaderboard.service';

const leaderboardService = new LeaderboardService();
const clickService = new ClickService(leaderboardService);

export const setupWebSocket = (io: Server) => {
    leaderboardService.setupLeaderboard();

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('click', async (data) => await clickService.handleUserClick(io, socket, data));
        socket.on('requestLeaderboard', async () => await leaderboardService.sendLeaderboard(io));
        socket.on('disconnect', () => clickService.handleUserDisconnect(socket));
    });
};
