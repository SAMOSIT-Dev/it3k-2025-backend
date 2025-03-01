import express from 'express';
import { getAllMatches, getMatchByEvent, getMatchById } from '../controllers/athletics.controller';

const router = express.Router();

router.get('/', getAllMatches);
router.get('/event-name/:event', getMatchByEvent);
router.get('/:id', getMatchById);
// router.post('/', createMatch);
// router.put('/:id', updateMatch);
// router.delete('/:id', deleteMatch);

export default router;