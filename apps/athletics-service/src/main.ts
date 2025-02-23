import app from "./app/app";
import { closePool } from './database/database';

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
  console.log(`athletics-service Listening at http://localhost:${port}`);
});
server.on('error', console.error);
