import { Router } from "express";
import { checkBadmintonConnection } from "../controllers/badminton.controller";

const router = Router();
router.get('/check', checkBadmintonConnection)


export default router;