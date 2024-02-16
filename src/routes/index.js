import { Router } from "express";
import userRoutes from "./userRoutes.js"
import orderRoutes from "./orderRoutes.js"
import { verifyUser } from "../middleware/authentication.js";

const router = Router()

router.use('/users', userRoutes);
router.use("/orders",verifyUser, orderRoutes);

export default router;