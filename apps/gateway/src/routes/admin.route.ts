import { Router } from "express";
import { checkAdminConnection } from "../controllers/admin.controller";

const router = Router();
router.get('/health', checkAdminConnection)

export default router;