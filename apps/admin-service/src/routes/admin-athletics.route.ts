import {Router} from 'express';
import { verifyToken, isAthleticsAdmin } from '../middlewares/admin.middleware';

const router = Router();
router.get('/', verifyToken, isAthleticsAdmin, (req, res) => {
    res.status(200).send('AthleticsAdmin Admin Service');
})

export default router;