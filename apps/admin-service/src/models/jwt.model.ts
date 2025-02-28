import { Request } from 'express';

export interface AdminJwtPayload {
    id: number;
    username: string;
    role: 'super_admin' | 'admin_football' | 'admin_basketball' | 'admin_badminton' | 'admin_pingpong' | 'admin_athletics';
}

export interface AdminRequest extends Request {
    admin?: AdminJwtPayload;
}
