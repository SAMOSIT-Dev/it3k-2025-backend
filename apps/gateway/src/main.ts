import app from "./app/app";

const port = process.env.PORT || 8099;
const server = app.listen(port, () => {
  console.log(`Gateway Listening at http://localhost:${port}`);
});
server.on('error', console.error);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});