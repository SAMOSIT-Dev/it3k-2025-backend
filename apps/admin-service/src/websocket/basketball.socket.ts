import { Server } from 'socket.io';
import axios from 'axios';
import BasketBallService from '../services/basketball.service';

export const setupWebSocket = (io: Server) => {

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('updateMatchScore', async (data) => {
            console.log('Received updated score:', data);

            await BasketBallService.updateBasketballScore(data);

            const response = await axios.get('http://basketball-service:8083/api/basketball/matches/revalidate');
            console.log("Response from basketball service:", response.data);
        })
    })

    console.log("Basketball socket setup complete");
}
