import { Router } from "express";
import { checkBadmintonConnection, getBadmintonMatches, getBadmintonMatchesByType } from "../controllers/badminton.controller";

const router = Router();
router.get('/health', checkBadmintonConnection)
router.get('/', getBadmintonMatches)
router.get('/:type', getBadmintonMatchesByType)


export default router;