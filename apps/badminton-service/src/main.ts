import express from 'express';
import * as path from 'path';
import mysql from 'mysql2/promise';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'it3k-2025',
  port: Number(process.env.DB_PORT) || 3307,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection endpoint
app.get('/api/db-test', async (req, res) => {
  try {
    // Simple query to test connection
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({
      message: 'Database connection successful',
      data: rows
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      message: 'Database connection failed',
      error: error.message
    });
  }
});

app.get('/api/check', (req, res) => {
  res.send({ message: 'Welcome to badminton-service!', is_connected: true });
});

const port = process.env.PORT || 8082;
const server = app.listen(port, () => {
  console.log(`badminton-service Listening at http://localhost:${port}`);
});
server.on('error', console.error);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    pool.end();
  });
});