import { Router } from "express";
import { checkScheduleConnection, getSchedules } from "../controllers/schedule.controller";

const router = Router();
router.get('/health', checkScheduleConnection);
router.get('/', getSchedules);

export default router;