import {Router} from 'express';
import { getPoints } from '../controllers/point.controller';

const router = Router();

router.get('/', getPoints);

export default router;