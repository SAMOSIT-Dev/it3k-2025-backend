import { Server, Socket } from 'socket.io';
import { redisClient } from '../config/redis';
import { ClickDto } from '../dto/click.dto';
import { LeaderboardService } from './leaderboard.service';

const clickLimits = new Map<string, { count: number; lastReset: number }>();

export class ClickService {
    leaderboardService: LeaderboardService;

    constructor(leaderboardService: LeaderboardService) {
        this.leaderboardService = leaderboardService
    }

    async handleUserClick(io: Server, socket: Socket, data: any) {
        const { error } = ClickDto.validate(data);
        if (error) {
            socket.emit('error', error.details[0].message);
            return;
        }

        if (data.clicks !== 1) {
            socket.emit('error', 'Invalid click value. Each click must count as 1.');
            return;
        }

        const now = Date.now();
        const userClicks = clickLimits.get(socket.id) || { count: 0, lastReset: now };

        if (now - userClicks.lastReset >= 1000) {
            userClicks.count = 0;
            userClicks.lastReset = now;
        }

        userClicks.count += data.clicks;

        if (userClicks.count > 20) {
            socket.emit('error', 'Too many clicks! Max 100 clicks per second allowed.');
            return;
        }

        clickLimits.set(socket.id, userClicks);
        await redisClient.zIncrBy('leaderboard', data.clicks, data.university);
        await this.leaderboardService.sendLeaderboard(io);
    }

    handleUserDisconnect(socket: Socket) {
        console.log(`User disconnected: ${socket.id}`);
        clickLimits.delete(socket.id);
    }
}
