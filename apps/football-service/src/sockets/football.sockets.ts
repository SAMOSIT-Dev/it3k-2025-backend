import { Server, Socket } from "socket.io";
import { sendScoreboard, sendOpeningMatch } from "../services/football.service";
import { pool } from "../database/database";

export function setupSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id);

    sendScoreboard(io);
    sendOpeningMatch(io);

    socket.on("getScoreboard", async () => {
      console.log("Client requested scoreboard");
      sendScoreboard(io);
    });

    socket.on("getMatch", async () => {
      console.log("Client requested match details");
      sendOpeningMatch(io);
    });

    socket.on("updateMatchScore", async (updatedData) => {
      console.log("Received updated score:", updatedData);
      try {
        await pool.execute(
          `UPDATE football_matches
           SET score_A = ?, score_B = ?, status = ?
           WHERE id = ?`,
          [updatedData.score_A, updatedData.score_B, updatedData.status, updatedData.id]
        );

        console.log(`Football match ${updatedData.id} updated successfully!`);

        sendScoreboard(io);
        sendOpeningMatch(io);
      } catch (error) {
        console.error("Error updating match score:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}
