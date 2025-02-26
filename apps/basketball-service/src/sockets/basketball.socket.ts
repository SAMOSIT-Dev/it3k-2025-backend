import { Server } from "socket.io";
import http from "http";
import express from "express";
import { BasketballService } from "../services/basketball.service";

import pool from "../databases/database";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS|| "*",
  },
});

const basketballService = new BasketballService();

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  basketballService.sendScoreboard(io);

  //// TEST ////
  socket.on("updateMatchScore", async (updatedData) => {
    console.log("Received updated score:", updatedData);

    try {
      await pool.execute(
        `UPDATE Basketball_Match 
        SET score_A_Q1 = ?, score_A_Q2 = ?, score_A_OT = ?, 
            score_B_Q1 = ?, score_B_Q2 = ?, score_B_OT = ? 
        WHERE id = ?`,
        [
          updatedData.score_A_Q1, updatedData.score_A_Q2, updatedData.score_A_OT,
          updatedData.score_B_Q1, updatedData.score_B_Q2, updatedData.score_B_OT,
          updatedData.id
        ]
      );

      console.log(`Match ${updatedData.id} updated successfully!`);
      basketballService.sendScoreboard(io); // ส่งข้อมูลอัปเดตให้ทุก client

    } catch (error) {
      console.error("Error updating match score:", error);
    }
  });
  //////////////

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

export { io, server };
