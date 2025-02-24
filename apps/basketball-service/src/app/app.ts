import express from 'express';
import { createServer } from 'http';

const app = express();
const server = createServer(app);

// Middleware
app.use(express.json());

export { app, server };
