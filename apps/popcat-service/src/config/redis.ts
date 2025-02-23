// src/database/redis.ts
import { createClient, RedisClientType } from 'redis';

export const redisClient: RedisClientType = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

export const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
        process.exit(1);
    }
};
