// src/tests/class.ts
import { HealthCheckResponse, Status } from '@it3k-2025-backend/shared';
import axios, { AxiosResponse } from 'axios';

export class HealthService {
    private readonly baseUrl: string;

    constructor(baseUrl = 'http://localhost:8099') {
        this.baseUrl = baseUrl;
    }

    async checkGatewayHealth(): Promise<HealthCheckResponse> {
        try {
            const response: AxiosResponse<HealthCheckResponse> = await axios.get(
                `${this.baseUrl}/health`
            );
            return response.data;
        } catch (error) {
            return {
                status: Status.DOWN,
                message: `Gateway is not responding ${error.message}`,
                is_connected: false,
                timeStamp: new Date().toISOString()
            };
        }
    }
}