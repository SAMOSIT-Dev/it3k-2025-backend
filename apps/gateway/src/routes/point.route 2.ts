import { Router } from "express";
import { checkPingPongConnection, getPoints } from "../controllers/point.controller";

const router = Router();
router.get('/health', checkPingPongConnection);
router.get('/', getPoints);

export default router;