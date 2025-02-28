import express from 'express';
import healthRoute from '../routes/health.route';
import pingpongRoutes from '../routes/pingpong.route';
const app = express();

app.use('/', healthRoute);
app.use('/api/pingpong', pingpongRoutes);

export default app;


