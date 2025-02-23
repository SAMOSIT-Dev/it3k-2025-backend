import express from 'express';
import * as path from 'path';
import healthRoute from '../routes/health.route';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/', healthRoute);

export default app;


