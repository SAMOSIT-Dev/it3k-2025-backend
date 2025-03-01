import { Router, Request, Response } from 'express';
import { getScoreboard, getOpeningMatch } from '../services/football.service';

const router = Router();

router.get('/score-board', async (_req : Request, res: Response) => {
  try {
    const scoreboard = await getScoreboard();
    res.json(scoreboard);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch scoreboard" });
  }
});

router.get('/matches', async (_req : Request, res : Response) => {
  try {
    const match = await getOpeningMatch();
    res.json({
      success: true,
      message:"Football match fetched successfully",
      data:match
    });
  } catch (error) {
    res.status(500).json({ success:false, error: "Failed to fetch football match" });
  }
});

export default router;
