import {Router} from 'express';
import { verifyToken, isPingpongAdmin } from '../middlewares/admin.middleware';

const router = Router();
router.get('/', verifyToken, isPingpongAdmin, (req, res) => {
    res.status(200).send('Pingpong Admin Service');
})

export default router;