import express from 'express';
import { createBadmintonMatch, updateBadmintonMatch, createBadmintonSet, updateBadmintonSet } from '../controllers/badminton.controller';
import { verifyToken, isBadmintonAdmin } from '../middlewares/admin.middleware'

const router = express.Router();

// Badminton Matches Routes
router.post('/matches', verifyToken, isBadmintonAdmin, createBadmintonMatch);
router.put('/matches/:id', verifyToken, isBadmintonAdmin, updateBadmintonMatch);

// Badminton Sets Routes
router.post('/sets', verifyToken, isBadmintonAdmin, createBadmintonSet);
router.put('/sets/:id', verifyToken, isBadmintonAdmin, updateBadmintonSet);

export default router;