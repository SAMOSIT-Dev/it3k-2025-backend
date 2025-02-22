import { Router } from "express";
import { checkBasketballConnection } from "../controllers/basketball.controller";

const router = Router();
router.get('/check', checkBasketballConnection)

export default router;