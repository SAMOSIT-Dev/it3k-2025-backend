import { server } from "./app/app";
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

const PORT = process.env.PORT || 8083;
server.listen(PORT, () => {
  console.log(`football-service Listening at http://localhost:${PORT}`);
});
