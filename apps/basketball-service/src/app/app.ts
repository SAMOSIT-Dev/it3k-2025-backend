import express from 'express';
import basketballRoutes from '../routes/basketball.route';

const app = express();

app.use(express.json());
app.use('/api/basketball', basketballRoutes);

export default app;
