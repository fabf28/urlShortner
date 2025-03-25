import { Router } from "express";
import { reqAnalytics } from "../controllers/adminController";


const router = Router();

//GET
router.get('/:id', reqAnalytics);



export default router;

