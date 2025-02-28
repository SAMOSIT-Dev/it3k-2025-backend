import { pool } from '../database/database';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AdminJwtPayload } from '../models/jwt.model';

// First, modify your login function to include a refresh token
export const loginAdmin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Use MySQL prepared statement syntax
        const [rows] = await pool.execute(
            'SELECT * FROM admins WHERE username = ? AND password = ?',
            [username, password]
        );

        // Check if user exists
        if (!rows || (Array.isArray(rows) && rows.length === 0)) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const admin = rows[0];
        
        // Create JWT payload
        const payload = {
            id: admin.id,
            username: admin.username,
            role: admin.role
        };

        // Generate access token (short-lived)
        const accessToken = jwt.sign(
            payload, 
            process.env.JWT_SECRET || 'it3k-2025-secret', 
            { expiresIn: '3h' }
        );

        // Generate refresh token (long-lived)
        const refreshToken = jwt.sign(
            { id: admin.id },
            process.env.REFRESH_TOKEN_SECRET || 'it3k-2025-refresh-secret',
            { expiresIn: '7d' }
        );

        // Store refresh token in database
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

// Add a refresh token endpoint
export const refreshAccessToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }

        // Verify refresh token is valid
        try {
            const decoded = jwt.verify(
                refreshToken, 
                process.env.REFRESH_TOKEN_SECRET || 'it3k-2025-refresh-secret'
            ) as { id: number };

            // Check if refresh token exists in database
            const [tokens] = await pool.execute(
                'SELECT * FROM refresh_tokens WHERE token = ? AND admin_id = ? AND expires_at > NOW() AND is_revoked = 0',
                [refreshToken, decoded.id]
            );

            if (!tokens || (Array.isArray(tokens) && tokens.length === 0)) {
                return res.status(401).json({ message: 'Invalid refresh token' });
            }

            // Get admin details
            const [admins] = await pool.execute(
                'SELECT id, username, role FROM admins WHERE id = ?',
                [decoded.id]
            );

            if (!admins || (Array.isArray(admins) && admins.length === 0)) {
                return res.status(404).json({ message: 'Admin not found' });
            }

            const admin = admins[0];

            // Create new access token
            const payload: AdminJwtPayload = {
                id: admin.id,
                username: admin.username,
                role: admin.role
            };

            const accessToken = jwt.sign(
                payload,
                process.env.JWT_SECRET || 'it3k-2025-secret',
                { expiresIn: '3h' }
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

// Add logout functionality to revoke refresh tokens
export const logoutAdmin = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }

        // Mark the refresh token as revoked
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