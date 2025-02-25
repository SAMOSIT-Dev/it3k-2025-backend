import express from 'express';
import healthRoute from '../routes/health.route';
import scheduleRoute from '../routes/schedule.route'

const app = express();

app.use(express.json());
app.use('/', healthRoute);
app.use('/api/schedules', scheduleRoute);

export default app;


