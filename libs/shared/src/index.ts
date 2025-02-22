export interface HealthCheckResponse {
    status: Status;
    message: string;
    is_connected: boolean;
    timeStamp: string;

}

export enum Status {
    UP = 'UP',
    DOWN = 'DOWN'
}