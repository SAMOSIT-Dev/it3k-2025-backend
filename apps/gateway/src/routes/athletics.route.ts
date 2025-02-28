import { Router } from "express";
import { checkAthleticsConnection, getAllMatches, getMatchByEvent, getMatchById } from "../controllers/athletics.controller";

const router = Router();
router.get('/health', checkAthleticsConnection)
router.get('/', getAllMatches)
router.get('/:id', getMatchById)
router.get('/:event', getMatchByEvent)


export default router;