import express from 'express';
import { createMatch, deleteMatch, updateMatch } from '../controllers/athletics.controller';
import { verifyToken, isAthleticsAdmin } from '../middlewares/admin.middleware'

const router = express.Router();

router.post('/', verifyToken, isAthleticsAdmin, createMatch);
router.put('/:id', verifyToken, isAthleticsAdmin, updateMatch);
router.delete('/:id', verifyToken, isAthleticsAdmin, deleteMatch);

export default router;