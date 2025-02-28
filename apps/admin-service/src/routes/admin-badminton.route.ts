import {Router} from 'express';
import { verifyToken, isBadmintonAdmin } from '../middlewares/admin.middleware';

const router = Router();
router.get('/', verifyToken, isBadmintonAdmin, (req, res) => {
    res.status(200).send('Badminton Admin Service');
})

export default router;