import { Router } from "express";
import { createBasketballMatch, updateBasketballScore, updateBasketballMatch, deleteBasketballMatch } from "../../controllers/admin/basketball.controller";

const router = Router();

router.post('/', createBasketballMatch);
router.put('/:id', updateBasketballMatch);
router.put('/score/:id', updateBasketballScore);
router.delete('/:id', deleteBasketballMatch);

export default router;