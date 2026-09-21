import express from "express";
import { protect } from "../controllers/authControllers";
import {
  getOrders,
  getMyOrders,
  getOrder,
  getRecentOrder,
} from "../controllers/orderControllers";

const router = express.Router();

router.use(protect);
router.get("/myOrders", getMyOrders);
router.get("/recentOrder/:userId", getRecentOrder);

// app.use(restrict("admin")) admin only

router.get("/", getOrders);
router.route("/:id").get(getOrder);
// .delete(deleteFavoriet);

export default router;