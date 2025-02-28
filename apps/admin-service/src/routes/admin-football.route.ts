import {Router} from 'express';
import { verifyToken, isFootballAdmin } from '../middlewares/admin.middleware';

const router = Router();
router.get('/', verifyToken, isFootballAdmin, (req, res) => {
    res.status(200).send('Football Admin Service');
})

export default router;