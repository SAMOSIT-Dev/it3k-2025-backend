import {Router} from 'express';
import { getSchedules, updateSchedule } from '../controllers/schedule.controller';

const router = Router();

router.get('/', getSchedules)
router.put('/:id', updateSchedule)

export default router;