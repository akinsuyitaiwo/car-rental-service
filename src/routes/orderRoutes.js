import {Router} from "express";
import {createOrder, getOrders, getOrderById, orderResponse} from "../controllers/order.js";
import { verifyRider} from "../middleware/authentication.js"

const router = Router();

router.post('/', createOrder);
router.get("/", verifyRider, getOrders);
router.get("/:orderId", getOrderById);
router.post("/:orderId", verifyRider,orderResponse)

export default router