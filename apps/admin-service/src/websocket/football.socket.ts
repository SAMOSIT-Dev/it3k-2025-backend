import { Server } from 'socket.io';
import FootballService from '../services/football.service';
import axios from 'axios';

export const setupWebSocket = (io: Server) => {

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('updateMatchScore', async (data) => {
            console.log('Received updated score:', data);

            await FootballService.updateFootballScore(data);

            const response = await axios.get('http://football-service:8084/api/football/matches/revalidate');
            console.log("Response from football service:", response.data);
        })
    })

    console.log("Football socket setup complete");
}
