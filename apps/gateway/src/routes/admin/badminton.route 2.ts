import { Router } from "express";
import { createBadmintonMatch, updateBadmintonMatch, createBadmintonSet, updateBadmintonSet } from "../../controllers/admin/badminton.controller";

const router = Router();

router.post('/matches', createBadmintonMatch);
router.put('/matches/:id', updateBadmintonMatch);
router.post('/sets', createBadmintonSet);
router.put('/sets/:id', updateBadmintonSet);

export default router;