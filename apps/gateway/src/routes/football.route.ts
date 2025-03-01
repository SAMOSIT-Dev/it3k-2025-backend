import {Router} from 'express';
import {getScoreboard, getOpeningMatch} from '../controllers/football.controller';

const router = Router();

router.get('/score-board', getScoreboard);
router.get('/matches', getOpeningMatch);

export default router;