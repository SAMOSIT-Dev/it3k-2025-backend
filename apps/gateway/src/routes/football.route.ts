import { Router } from "express";
import { checkFootballConnection } from "../controllers/football.controller";

const router = Router();
router.get('/health', checkFootballConnection)


export default router;