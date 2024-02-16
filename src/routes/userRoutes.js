import { Router } from "express";
import {signInUser,signUpUser} from "../controllers/user.js";


const router = Router();
 
router.post('/signup', signUpUser);
router.post('/signin', signInUser);

export default router