import request from 'supertest';
import { HealthService } from './class';
import { Status, HealthCheckResponse } from '@it3k-2025-backend/shared';
import express, { Request, Response } from 'express';

describe('Sports Services Health Check Tests', () => {
    // Service configurations
    const services = {
        admin: { port: '8080', app: express(), server: null },
        athletics: { port: '8081', app: express(), server: null },
        badminton: { port: '8082', app: express(), server: null },
        pingpong: { port: '8085', app: express(), server: null },
    };

    // HealthService instances
    const healthServices: { [key: string]: HealthService } = {};

    beforeAll(async () => {
        // Setup all mock servers
        Object.entries(services).forEach(([name, service]) => {
            service.app.get('/health', (req: Request, res: Response) => {
                res.json({
                    status: Status.UP,
                    message: `${name.charAt(0).toUpperCase() + name.slice(1)} service is healthy`,
                    is_connected: true,
                    timeStamp: new Date().toISOString()
                });
            });

            service.server = service.app.listen(parseInt(service.port));
            healthServices[name] = new HealthService('http://localhost', service.port);
        });
    });

    afterAll(async () => {
        // Cleanup all servers
        Object.values(services).forEach(service => {
            if (service.server) service.server.close();
        });
    });

    describe('Individual Service Health Checks', () => {
        // Admin Service (8080)
        describe('Admin Service', () => {
            it('should return UP status when service is healthy', async () => {
                const response = await request(services.admin.app)
                    .get('/health')
                    .expect(200);

                expect(response.body.status).toBe(Status.UP);
                expect(response.body.message).toContain('Admin');

                const serviceResponse = await healthServices.admin.checkServiceHealth();
                expect(serviceResponse.status).toBe(Status.UP);
            });

            it('should handle service being down', async () => {
                services.admin.server.close();
                const response = await healthServices.admin.checkServiceHealth();
                expect(response.status).toBe(Status.DOWN);
                services.admin.server = services.admin.app.listen(8080);
            });
        });

        // Athletics Service (8081)
        describe('Athletics Service', () => {
            it('should return UP status when service is healthy', async () => {
                const response = await request(services.athletics.app)
                    .get('/health')
                    .expect(200);

                expect(response.body.status).toBe(Status.UP);
                expect(response.body.message).toContain('Athletics');
            });
        });

        // Badminton Service (8082)
        describe('Badminton Service', () => {
            it('should return UP status when service is healthy', async () => {
                const response = await request(services.badminton.app)
                    .get('/health')
                    .expect(200);

                expect(response.body.status).toBe(Status.UP);
                expect(response.body.message).toContain('Badminton');
            });
        });



        // Ping Pong Service (8085)
        describe('Ping Pong Service', () => {
            it('should return UP status when service is healthy', async () => {
                const response = await request(services.pingpong.app)
                    .get('/health')
                    .expect(200);

                expect(response.body.status).toBe(Status.UP);
                expect(response.body.message).toContain('Pingpong');
            });
        });
    });

    describe('Error Scenarios', () => {
        it('should handle timeout scenarios', async () => {
            // Increase Jest timeout for this specific test
            jest.setTimeout(10000);
            
            const slowApp = express();
            slowApp.get('/health', (req: Request, res: Response) => {
                const response: HealthCheckResponse = {
                    status: Status.UP,
                    message: 'Slow service health check',
                    is_connected: true,
                    timeStamp: new Date().toISOString()
                };
                
                // Simulate a slow response
                return new Promise((resolve) => {
                    setTimeout(() => {
                        res.status(200).json(response);
                        resolve(response);
                    }, 3000);
                });
            });

            const slowServer = slowApp.listen(8086);
            const slowService = new HealthService('http://localhost', '8086');

            // Configure axios timeout in HealthService (you might need to add this option to your HealthService class)
            const startTime = Date.now();
            const serviceResponse = await slowService.checkServiceHealth();
            const endTime = Date.now();

            expect(serviceResponse.status).toBe(Status.DOWN);
            expect(serviceResponse.message).toContain('not responding');
            expect(endTime - startTime).toBeLessThan(5000); // Ensure we're not waiting the full 5 seconds

            slowServer.close();
            
            // Reset Jest timeout
            jest.setTimeout(5000);
        });

        it('should handle malformed responses', async () => {
            const malformedApp = express();
            malformedApp.get('/health', (req: Request, res: Response) => {
                res.json({
                    status: Status.UP,
                    // Missing other required fields
                });
            });

            const malformedServer = malformedApp.listen(8087);
            const malformedService = new HealthService('http://localhost', '8087');

            const serviceResponse = await malformedService.checkServiceHealth();
            expect(serviceResponse.status).toBe(Status.UP);

            malformedServer.close();
        });
    });

    describe('Concurrent Health Checks', () => {
        it('should check all services simultaneously', async () => {
            const healthChecks = Object.values(healthServices).map(service => 
                service.checkServiceHealth()
            );

            const responses = await Promise.all(healthChecks);
            
            responses.forEach(response => {
                expect(response.status).toBe(Status.UP);
                expect(response.is_connected).toBe(true);
            });
        });

    });
});