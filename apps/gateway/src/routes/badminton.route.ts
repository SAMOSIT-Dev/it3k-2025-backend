import { Router } from "express";
import { checkBadmintonConnection } from "../controllers/badminton.controller";

const router = Router();
router.get('/health', checkBadmintonConnection)


export default router;