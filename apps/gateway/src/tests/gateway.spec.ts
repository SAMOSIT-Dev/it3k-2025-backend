// src/tests/gateway.spec.ts
import request from 'supertest';
import { Status } from '@it3k-2025-backend/shared';
import app from '../app/app';

describe('Gateway API Tests', () => {
    describe('Health Check', () => {
        jest.setTimeout(10000);

        beforeAll((done) => {
            setTimeout(done, 1000);
        });

        it('should check gateway health status', async () => {
            try {
                const response = await request(app)
                    .get('/health')
                    .timeout(5000)
                    .expect('Content-Type', /json/)
                    .expect(200);

                expect(response.body).toEqual(
                    expect.objectContaining({
                        status: Status.UP,
                        message: expect.any(String),
                        is_connected: true,
                    })
                );

                expect(response.body.timeStamp).toBeDefined();
                expect(new Date(response.body.timeStamp)).toBeInstanceOf(Date);
            } catch (error) {
                console.error('Test failed with error:', {
                    message: error.message,
                    code: error.code,
                    response: error.response?.body
                });
                throw error;
            }
        });

        afterAll(done => {
            done();
        });
    });
});