import { server } from "./sockets/basketball.socket";

const PORT = process.env.PORT || 8083;

server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});
