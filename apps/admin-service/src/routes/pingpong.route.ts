import express from 'express';
import { createPingpongMatch, updatePingpongMatch } from '../controllers/pingpong.controller';
import { createBadmintonSet, updateBadmintonSet } from '../controllers/badminton.controller';

const router = express.Router();

// Badminton Matches Routes
router.post('/matches', createPingpongMatch);
router.put('/matches/:id', updatePingpongMatch);

// Badminton Sets Routes
router.post('/sets', createBadmintonSet);
router.put('/sets/:id', updateBadmintonSet);

export default router;