import { Server } from "socket.io";
import { sendScoreboard, sendDashboard, sendOpeningMatch,  } from "../services/basketball.service";


export function setupSocket(io: Server) {

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    sendScoreboard(io);
    sendDashboard(io);
    sendOpeningMatch(io);
    
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}
