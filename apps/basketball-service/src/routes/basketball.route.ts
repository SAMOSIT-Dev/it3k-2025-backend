import { Router } from 'express';
import { testDbConnection,  getScoreboard } from '../controllers/basketball.controller';

const router = Router();

router.get('/db-test', testDbConnection);

router.get('/scoreboard', getScoreboard)

export default router;
