import { Router } from 'express';
import { createBasketballMatch, updateBasketballMatch, deleteBasketballMatch, updateBasketballScore } from '../controllers/basketball.controller';
import { verifyToken, isBasketballAdmin } from '../middlewares/admin.middleware'

const router = Router();

router.post('/', verifyToken, isBasketballAdmin, createBasketballMatch);
router.put('/score/:id', verifyToken, isBasketballAdmin, updateBasketballScore)
router.put('/:id', verifyToken, isBasketballAdmin, updateBasketballMatch);
router.delete('/:id', verifyToken, isBasketballAdmin, deleteBasketballMatch)

export default router;