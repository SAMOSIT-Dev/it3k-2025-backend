import {Router} from 'express';
import { getBadmintonMatches, getBadmintonMatchesByType, } from '../controllers/badminton.controller';

const router = Router();

router.get('/', getBadmintonMatches);
router.get('/:type', getBadmintonMatchesByType);

export default router;