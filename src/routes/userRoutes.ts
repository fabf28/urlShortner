import { Router } from "express";
import { getLongUrl, shortenUrl } from "../controllers/userController";
import { logger } from "../middleware";

const router = Router();


//POST
router.post('/shorten', shortenUrl);

//GET
router.get('/:id', logger, getLongUrl);

export default router;