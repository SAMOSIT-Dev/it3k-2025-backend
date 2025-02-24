import { Server } from 'socket.io';
import { getScoreboard } from '../controllers/basketball.controller';

export class BasketballService {
    async sendScoreboard(io: Server) {
        try {
            const mockReq = {} as any;
            const mockRes = {
                json: (data: any) => {
                    io.emit('updateScoreboard', data.data);
                },
                status: (_: number) => ({
                    json: (_: any) => {},
                }),
            } as any;

            await getScoreboard(mockReq, mockRes);
        } catch (error) {
            console.error('Error fetching scoreboard:', error);
        }
    }
}
