import express from 'express';
import healthRouter from '../routes/health.route';
import athleticsMatchesRouter from '../routes/athletics.route';

const app = express();

app.use(express.json());
app.use('/',healthRouter)
app.use('/api/athletics', athleticsMatchesRouter);

export default app