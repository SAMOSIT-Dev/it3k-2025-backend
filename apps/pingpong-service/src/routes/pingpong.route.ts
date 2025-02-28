import {Router} from 'express';
import { getPingpongMatches, getPingpongMatchesByType, } from '../controllers/pingpong.controller';

const router = Router();

router.get('/', getPingpongMatches);
router.get('/:type', getPingpongMatchesByType);

export default router;