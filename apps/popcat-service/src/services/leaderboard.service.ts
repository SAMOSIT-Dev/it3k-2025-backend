import { Server } from 'socket.io';
import { redisClient } from '../config/redis';

export class LeaderboardService {
    private universities = ['KMUTT', 'KMITL', 'KMUTNB BKK', 'KMUTNB PR'];

    async setupLeaderboard() {
        // Check if the leaderboard already has entries
        const existingCount = await redisClient.zCard('leaderboard');
        if (existingCount > 0) {
            console.log('Leaderboard already seeded. Skipping setup.');
            return;
        }

        const defaultData = this.universities.map(university => ({
            university,
            score: 0,
        }));

        // Add universities to the Redis sorted set (with initial score 0)
        const pipeline = redisClient.multi();
        defaultData.forEach(({ university, score }) => {
            pipeline.zAdd('leaderboard', { score, value: university });
        });

        await pipeline.exec();
        console.log('Leaderboard initialized with default values');
    }

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
