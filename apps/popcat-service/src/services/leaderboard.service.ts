import { Server } from 'socket.io';
import { redisClient } from '../config/redis';

export class LeaderboardService {
    async sendLeaderboard(io: Server) {
        const leaderboard = await redisClient.zRangeWithScores('leaderboard', 0, -1, { REV: true });

        const formattedLeaderboard = leaderboard.map((entry: any, index: number) => ({
            rank: index + 1,
            university: entry.value,
            clicks: entry.score,
        }));

        io.emit('updateLeaderboard', formattedLeaderboard);
    }
}
