import {Router} from "express";
import {createOrder, getOrders} from "../controllers/order.js";
import { verifyRider} from "../middleware/authentication.js"

const router = Router();

router.post('/create', createOrder);
router.get("/", verifyRider, getOrders);

export default router