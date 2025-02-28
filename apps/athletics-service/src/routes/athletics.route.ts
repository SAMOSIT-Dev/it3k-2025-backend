import express from 'express';
import { createMatch, deleteMatch, getAllMatches, getMatchByEvent, getMatchById, updateMatch } from '../controllers/athletics.controller';

const router = express.Router();

router.post('/', createMatch);
router.get('/', getAllMatches);
router.get('/search', getMatchByEvent);
router.get('/:id', getMatchById);
router.put('/:id', updateMatch);
router.delete('/:id', deleteMatch);

export default router;