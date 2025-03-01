import { Router } from 'express';
import { getScoreboard, getOpeningMatch } from '../services/football.service';

const router = Router();

router.get('/score-board', async (req, res) => {
  try {
    const scoreboard = await getScoreboard();

    // console.log("Sending scoreboard response:", scoreboard);
    res.json(scoreboard);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch scoreboard" });
  }
});

router.get('/match', async (req, res) => {
  try {
    const match = await getOpeningMatch();

    // console.log("match response:", match);
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch football match" });
  }
});

export default router;
