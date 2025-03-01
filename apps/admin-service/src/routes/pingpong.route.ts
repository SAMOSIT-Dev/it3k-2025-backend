import express from 'express';
import { createPingpongMatch, updatePingpongMatch } from '../controllers/pingpong.controller';
import { createBadmintonSet, updateBadmintonSet } from '../controllers/badminton.controller';
import { verifyToken, isPingpongAdmin } from '../middlewares/admin.middleware'

const router = express.Router();

// Badminton Matches Routes
router.post('/matches', verifyToken, isPingpongAdmin, createPingpongMatch);
router.put('/matches/:id', verifyToken, isPingpongAdmin, updatePingpongMatch);

// Badminton Sets Routes
router.post('/sets', verifyToken, isPingpongAdmin, createBadmintonSet);
router.put('/sets/:id', verifyToken, isPingpongAdmin, updateBadmintonSet);

export default router;