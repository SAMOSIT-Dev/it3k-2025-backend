import express from 'express';
import { getAllMatches, getMatchByEvent, getMatchById } from '../controllers/athletics.controller';

const router = express.Router();

router.get('/', getAllMatches);
router.get('/event/:event', getMatchByEvent);
router.get('/:id', getMatchById);

export default router;