import { Router } from "express";
import { createSchedule, updateSchedule, deleteSchedule } from "../../controllers/admin/schedule.controller";

const router = Router();

router.post('/', createSchedule);
router.put('/:id', updateSchedule);
router.delete('/:id', deleteSchedule);

export default router;