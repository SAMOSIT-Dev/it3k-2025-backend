import { Router } from 'express';
import { 
    loginAdmin, 
    refreshAccessToken, 
    logoutAdmin 
} from '../controllers/admin-auth.controller';

const   router = Router();

router.post('/login', loginAdmin);
router.post('/refresh-token', refreshAccessToken);
router.post('/logout', logoutAdmin);

export default router;