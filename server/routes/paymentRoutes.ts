import express from "express";
import {
  createPaymentSession,
  verifyPayment,
  getMonthlySales,
  getPaymentStatusCount,
  getAllPayments,
  test,
} from "../controllers/paymentControllers";
import { protect } from "../controllers/authControllers";

const router = express.Router();

router.post("/create/sessions", protect, createPaymentSession);
router.get("/verify", verifyPayment);

router.get("/error", test);

// app.use(restrict("admin")) only show for admin

router.get("/stats/monthlySales", getMonthlySales);
router.get("/stats/paymentStatusCount", getPaymentStatusCount);
router.route("/").get(getAllPayments);

export default router;