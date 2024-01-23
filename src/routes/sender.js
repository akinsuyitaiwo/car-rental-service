import { Router } from "express";
import { signUpSender, signInSender } from "../controllers/sender";


const router = Router();
 
router.post('/signUp', signUpSender);
router.post('/signIn', signInSender);

export default router