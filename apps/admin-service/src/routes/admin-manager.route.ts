import {Router} from 'express';
import {verifyToken, isAthleticsAdmin, isBadmintonAdmin, isBasketballAdmin, isFootballAdmin, isPingpongAdmin} from '../middlewares/admin.middleware'

const router = Router();

router.put('/athletics', verifyToken, isAthleticsAdmin)
router.put('/badminton', verifyToken, isBadmintonAdmin)
router.put('/basketball', verifyToken, isBasketballAdmin)
router.put('/football', verifyToken, isFootballAdmin)
router.put('/pingpong', verifyToken, isPingpongAdmin)



export default router;