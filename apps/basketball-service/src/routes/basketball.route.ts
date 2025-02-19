import { Router } from 'express';
import { getScoreboard, getSchedule } from '../controllers/basketball.controller';

const router = Router();

router.get('/scoreboard', getScoreboard)
router.get('/schedule', getSchedule)

export default router;
