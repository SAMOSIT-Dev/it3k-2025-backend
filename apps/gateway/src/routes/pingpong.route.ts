import { Router } from "express";
import { checkPingPongConnection } from "../controllers/pingpong.controller";

const router = Router();
router.get('/health', checkPingPongConnection);

export default router;