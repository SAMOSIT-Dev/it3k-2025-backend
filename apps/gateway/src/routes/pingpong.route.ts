import { Router } from "express";
import { checkPingPongConnection, getPingpongMatches, getPingpongMatchesByTypes } from "../controllers/pingpong.controller";

const router = Router();
router.get('/health', checkPingPongConnection);
router.get('/', getPingpongMatches);
router.get('/:type', getPingpongMatchesByTypes);

export default router;