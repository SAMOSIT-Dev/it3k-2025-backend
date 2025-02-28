import {Router} from 'express';
import { verifyToken, isBasketballAdmin } from '../middlewares/admin.middleware';

const router = Router();
router.get('/', verifyToken, isBasketballAdmin, (req, res) => {
    res.status(200).send('Basketball Admin Service');
})

export default router;