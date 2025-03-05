import express from 'express';
import healthRoute from '../routes/health.route';
import pointsRoutes from '../routes/point.route';
const app = express();

app.use('/', healthRoute);
app.use('/api/points', pointsRoutes);

export default app;


