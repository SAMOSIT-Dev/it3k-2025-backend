import express from 'express';
import healthRoute from '../routes/health.route';

const app = express();

app.use('/', healthRoute);

export default app;


