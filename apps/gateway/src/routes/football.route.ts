import { Router } from "express";
import { checkFootballConnection } from "../controllers/football.controller";

const router = Router();
router.get('/check', checkFootballConnection)


export default router;