import express from 'express';
import { createBadmintonMatch, updateBadmintonMatch, createBadmintonSet, updateBadmintonSet } from '../controllers/badminton.controller';

const router = express.Router();

// Badminton Matches Routes
router.post('/matches', createBadmintonMatch);
router.put('/matches/:id', updateBadmintonMatch);

// Badminton Sets Routes
router.post('/sets', createBadmintonSet);
router.put('/sets/:id', updateBadmintonSet);

export default router;