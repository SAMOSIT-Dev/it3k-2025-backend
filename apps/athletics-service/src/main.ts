import express from 'express';
import { closePool } from './database/database';
import athleticsMatchesRouter from './routes/athletics.route';
import healthRouter from './routes/health.route';

const app = express();

app.use(express.json());
app.use('/athletics-matches', athleticsMatchesRouter);
app.use(healthRouter)


process.on('SIGINT', async () => {
  try {
    await closePool();
    process.exit(0);
  } catch (error) {
    console.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
});

const port = process.env.PORT || 8081;
const server = app.listen(port, () => {
  console.log(`athletics-service Listening at http://0.0.0.0:${port}`);
});

server.on('error', console.error);
