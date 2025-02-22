import { Router } from "express";
import { checkAdminConnection } from "../controllers/admin.controller";

const router = Router();
router.get('/check', checkAdminConnection)

export default router;