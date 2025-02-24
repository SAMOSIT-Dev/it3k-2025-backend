import { Router } from 'express';
import { getScoreboard, getSchedule } from '../controllers/basketball.controller';
import { io } from '../app/app';

const router = Router();

router.get('/scoreboard', async (req, res) => {
    await getScoreboard(req, res);
    io.emit('updateScoreboard', 'New scoreboard data available');
  });
router.get('/schedule', getSchedule)

export default router;
