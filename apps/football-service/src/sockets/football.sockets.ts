import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { sendScoreboard, sendOpeningMatch } from "../services/football.service";
import { pool } from "../database/database";

const SECRET_KEY = process.env.JWT_SECRET

interface AuthenticatedSocket extends Socket {
  user?: any;
}

export function setupSocket(io: Server) {
  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization;

    if (!token) {
      console.log("Authentication error: No token provided");
      return next(new Error("Authentication error"));
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      socket.user = decoded; // Attach user info to socket
      next(); // Allow connection
    } catch (error) {
      console.log("Authentication error: Invalid token");
      return next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket: AuthenticatedSocket) => {
    console.log("Client connected:", socket.id, "User:", socket.user);

    sendScoreboard(io);
    sendOpeningMatch(io);

    socket.on("updateMatchScore", async (updatedData) => {
      console.log("Received updated score:", updatedData, "User:", socket.user);

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
