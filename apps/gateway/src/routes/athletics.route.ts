import { Router } from "express";
import { checkAthleticsConnection } from "../controllers/athletics.controller";

const router = Router();
router.get('/health', checkAthleticsConnection)


export default router;