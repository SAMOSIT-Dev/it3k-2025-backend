// services/basketball.service.ts
import { Server } from 'socket.io';
import { fetchScoreboard } from '../controllers/basketball.controller';

export class BasketballService {
    async sendScoreboard(io: Server) {
        try {
          const scoreboard = await fetchScoreboard();
          io.emit('updateScoreboard', scoreboard);
        } catch (error) {
          console.error('Error sending scoreboard:', error);
        }
      }
}
