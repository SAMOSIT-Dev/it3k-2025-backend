import express from 'express';
import * as path from 'path';
import basketballRoutes from '../routes/basketball.route';

const app = express();

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, '../../assets')));
app.use('/api/basketball', basketballRoutes);

export default app;
