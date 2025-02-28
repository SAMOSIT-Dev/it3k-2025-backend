import express from 'express';
import healthRoute from '../routes/health.route';
import badmintonRoutes from '../routes/badminton.route';
const app = express();

app.use('/', healthRoute);
app.use('/api/badminton', badmintonRoutes);

export default app;


