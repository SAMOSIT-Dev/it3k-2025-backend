import { Server } from 'socket.io';
import { updateFootballScore } from '../services/football.service';

export const setupWebSocket = (io: Server) => {

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('updateMatchScore', async (data) => {
            console.log('Received updated score:', data);

            await updateFootballScore(data);

            // TODO: Call api to football service to update score
        })
    })
}
