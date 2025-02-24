import { server } from './app/app';

const port = process.env.PORT || 8083;
server.listen(port, () => {
  console.log(`basketball-service listening at http://localhost:${port}`);
});

server.on('error', console.error);

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
