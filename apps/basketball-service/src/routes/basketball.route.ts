import { Router } from 'express';
import { getScoreboard } from '../controllers/basketball.controller';

const router = Router();

router.get('/scoreboard', getScoreboard)

export default router;
