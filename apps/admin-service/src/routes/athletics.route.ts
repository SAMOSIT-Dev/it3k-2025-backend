import express from 'express';
import { createMatch, deleteMatch, updateMatch } from '../controllers/athletics.controller';

const router = express.Router();

router.post('/', createMatch);
router.put('/:id', updateMatch);
router.delete('/:id', deleteMatch);

export default router;