import { Router } from "express";
import { checkBasketballConnection } from "../controllers/basketball.controller";

const router = Router();
router.get('/health', checkBasketballConnection)

export default router;