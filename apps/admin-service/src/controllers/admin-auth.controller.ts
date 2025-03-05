import { pool } from '../database/database';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AdminJwtPayload } from '../models/jwt.model';

export const loginAdmin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const [rows] = await pool.execute(
            'SELECT * FROM admins WHERE username = ? AND password = ?',
            [username, password]
        );

        if (!rows || (Array.isArray(rows) && rows.length === 0)) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const admin = rows[0];
        
        const payload = {
            id: admin.id,
            username: admin.username,
            role: admin.role
        };
        const accessToken = jwt.sign(
            payload, 
            process.env.JWT_SECRET || 'it3k-2025-secret', 
            { expiresIn: '12h' }
        );

        const refreshToken = jwt.sign(
            { id: admin.id },
            process.env.REFRESH_TOKEN_SECRET || 'it3k-2025-refresh-secret',
            { expiresIn: '7d' }
        );

        await pool.execute(
            'INSERT INTO refresh_tokens (token, admin_id, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))',
            [refreshToken, admin.id]
        );

        return res.status(200).json({ 
            accessToken,
            refreshToken,
            admin: {
                id: admin.id,
                username: admin.username,
                role: admin.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }

        try {
            const decoded = jwt.verify(
                refreshToken, 
                process.env.REFRESH_TOKEN_SECRET || 'it3k-2025-refresh-secret'
            ) as { id: number };

            const [tokens] = await pool.execute(
                'SELECT * FROM refresh_tokens WHERE token = ? AND admin_id = ? AND expires_at > NOW() AND is_revoked = 0',
                [refreshToken, decoded.id]
            );

            if (!tokens || (Array.isArray(tokens) && tokens.length === 0)) {
                return res.status(401).json({ message: 'Invalid refresh token' });
            }

            const [admins] = await pool.execute(
                'SELECT id, username, role FROM admins WHERE id = ?',
                [decoded.id]
            );

            if (!admins || (Array.isArray(admins) && admins.length === 0)) {
                return res.status(404).json({ message: 'Admin not found' });
            }

            const admin = admins[0];

            const payload: AdminJwtPayload = {
                id: admin.id,
                username: admin.username,
                role: admin.role
            };

            const accessToken = jwt.sign(
                payload,
                process.env.JWT_SECRET || 'it3k-2025-secret',
                { expiresIn: '12h' }
            );

            return res.status(200).json({ accessToken });

        } catch (error) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }
    } catch (error) {
        console.error('Refresh token error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const logoutAdmin = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }

        await pool.execute(
            'UPDATE refresh_tokens SET is_revoked = 1 WHERE token = ?',
            [refreshToken]
        );

        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};