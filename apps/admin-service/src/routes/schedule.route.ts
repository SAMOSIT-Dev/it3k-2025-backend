import {Router} from 'express';
import { createSchedule, updateSchedule, deleteSchedule } from '../controllers/schedule.controller';
import {verifyToken, isSuperAdmin} from '../middlewares/admin.middleware'

const router = Router();

router.post('/',verifyToken,isSuperAdmin, createSchedule);
router.put('/:id', verifyToken, isSuperAdmin, updateSchedule);
router.delete('/:id', verifyToken, isSuperAdmin,  deleteSchedule)

export default router;