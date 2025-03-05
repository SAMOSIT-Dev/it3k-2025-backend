import { Router } from "express";
import { createFootballlMatch, updateFootballMatch, updateFootballScore, deleteFootballlMatch } from "../../controllers/admin/football.controller";

const router = Router();

router.post('/', createFootballlMatch);
router.put('/:id', updateFootballMatch);
router.put('/score/:id', updateFootballScore);
router.delete('/:id', deleteFootballlMatch);

export default router;