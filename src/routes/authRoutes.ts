import { Router } from "express";
import { logIn, signUp } from "../controllers/authController";


const router = Router();

//POST
router.post('/signup', signUp);

//POST
router.post('/login', logIn);

export default router;

