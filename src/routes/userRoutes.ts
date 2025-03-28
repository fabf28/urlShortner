import { Router } from "express";
import { getLongUrl, shortenUrl } from "../controllers/userController";
import { logger } from "../middleware";
import { authenticator } from "../controllers/authController";

const router = Router();


//POST
router.post('/shorten', authenticator, shortenUrl);

//GET
router.get('/:id', logger, getLongUrl);

export default router;