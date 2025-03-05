import { Router, Request, Response } from 'express';
import { Server } from 'socket.io';
import { sendScoreboard } from '../services/basketball.service';

const createBasketBallRouter = (io: Server) => {
  const router = Router();

  router.get('/matches/revalidate', async (_req: Request, res: Response) => {
    try {
      await sendScoreboard(io);
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
