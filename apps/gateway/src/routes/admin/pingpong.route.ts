import { Router } from "express";
import { createPingpongMatch, updatePingpongMatch, createPingpongSet, updatePingpongSet } from "../../controllers/admin/pingpong.controller";

const router = Router();

router.post('/matches', createPingpongMatch);
router.put('/matches/:id', updatePingpongMatch);
router.post('/sets', createPingpongSet);
router.put('/sets/:id', updatePingpongSet);

export default router;