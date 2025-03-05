import { Router, Request, Response } from 'express';
import { Server } from 'socket.io';
import { fetchDashboard, fetchScoreboard, fetchOpeningMatch, sendDashboard, sendScoreboard } from '../services/basketball.service';

const createBasketBallRouter = (io: Server) => {
  const router = Router();

  router.get('/scoreboard', async (_req: Request, res: Response) => {
    try {
      const scoreboard = await fetchScoreboard();
      res.json(scoreboard);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch scoreboard" });
    }
  });

  router.get('/dashboard', async (_req: Request, res: Response) => {
    try {
      const match = await fetchDashboard();
      res.json({
        success: true,
        message: "Basketball Dashboard fetched successfully",
        data: match
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch basketball dashboard" });
    }
  });

  router.get('/matches', async (_req: Request, res: Response) => {
    try {
      const match = await fetchOpeningMatch();
      res.json({
        success: true,
        message: "Basketball match fetched successfully",
        data: match
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch basketball match" });
    }
  });

  router.get('/matches/revalidate', async (_req: Request, res: Response) => {
    try {
      await sendScoreboard(io);
      await sendDashboard(io);
      res.json({
        success: true,
        message: "Basketball match fetched successfully",
        data: []
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch basketball match" });
    }
  });

  return router;
}


export default createBasketBallRouter;
