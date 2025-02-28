import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AdminRequest, AdminJwtPayload } from '../models/jwt.model';


export const verifyToken = (req: AdminRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'it3k-2025-secret') as AdminJwtPayload;
        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

export const checkRole = (allowedRoles: string[]) => {
    return (req: AdminRequest, res: Response, next: NextFunction) => {
        if (!req.admin) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const { role } = req.admin;

        // Super admin has access to everything
        if (role === 'super_admin') {
            return next();
        }

        // Check if admin has one of the allowed roles
        if (allowedRoles.includes(role)) {
            return next();
        }

        return res.status(403).json({ message: `Access denied for role ${req.admin.role}. Insufficient privileges, this route provide for admin role ${allowedRoles.join(', ')}` });
    };
};

export const isSuperAdmin = checkRole(['super_admin']);
export const isFootballAdmin = checkRole(['super_admin', 'admin_football']);
export const isBasketballAdmin = checkRole(['super_admin', 'admin_basketball']);
export const isBadmintonAdmin = checkRole(['super_admin', 'admin_badminton']);
export const isPingpongAdmin = checkRole(['super_admin', 'admin_pingpong']);
export const isAthleticsAdmin = checkRole(['super_admin', 'admin_athletics']);