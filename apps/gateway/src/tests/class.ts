import { HealthCheckResponse, Status } from '@it3k-2025-backend/shared';
import axios, { AxiosResponse } from 'axios';
export class HealthService {
    private readonly baseUrl: string;
    private readonly timeout: number;

    constructor(url: string, port: string, timeout = 2000) {
        this.baseUrl = `${url}:${port}`;
        this.timeout = timeout;
    }

    async checkServiceHealth(): Promise<HealthCheckResponse> {
        try {
            const response: AxiosResponse<HealthCheckResponse> = await axios.get(
                `${this.baseUrl}/health`,
                {
                    timeout: this.timeout // Add timeout configuration
                }
            );
            return response.data;
        } catch (error) {
            return {
                status: Status.DOWN,
                message: `Gateway is not responding: ${error.message}`,
                is_connected: false,
                timeStamp: new Date().toISOString()
            };
        }
    }
}