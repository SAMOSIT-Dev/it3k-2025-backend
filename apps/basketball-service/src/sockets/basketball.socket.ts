import { Server } from "socket.io";
import { sendScoreboard, sendDashboard  } from "../services/basketball.service";

import { pool } from "../databases/database";

export function setupSocket(io: Server) {

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    sendScoreboard(io);
    sendDashboard(io);
    
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}
