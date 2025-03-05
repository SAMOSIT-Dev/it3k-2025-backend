import { Server } from 'socket.io';


export const setupWebSocket = (io: Server) => {


    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('click', async (data) => await clickService.handleUserClick(io, socket, data));
        socket.on('requestLeaderboard', async () => await leaderboardService.sendLeaderboard(io));
        socket.on('disconnect', () => clickService.handleUserDisconnect(socket));
    });
};
