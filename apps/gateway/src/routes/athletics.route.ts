import { Router } from "express";
import { checkAthleticsConnection } from "../controllers/athletics.controller";

const router = Router();
router.get('/check', checkAthleticsConnection)


export default router;