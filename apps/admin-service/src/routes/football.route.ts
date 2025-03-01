import { Router } from 'express';
import { createFootballMatch, updateFootballMatch, deleteFootballMatch, updateFootballScore } from '../controllers/football.controller';
import { verifyToken, isFootballAdmin } from '../middlewares/admin.middleware'

const router = Router();

router.post('/', verifyToken, isFootballAdmin, createFootballMatch);
router.put('/:id', verifyToken, isFootballAdmin, updateFootballMatch);
router.put('/score/:id', verifyToken, isFootballAdmin, updateFootballScore);
router.delete('/:id', verifyToken, isFootballAdmin, deleteFootballMatch)

export default router;