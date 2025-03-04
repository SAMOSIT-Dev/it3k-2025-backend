import { Router } from "express";
import { createAthleticsMatch, updateAthleticsMatch, deleteAthleticsMatch } from "../../controllers/admin/athletics.controller";

const router = Router();

router.post('/', createAthleticsMatch);
router.put('/:id', updateAthleticsMatch);
router.delete('/:id', deleteAthleticsMatch);

export default router;