const express = require("express");
const {
  createPaymentSession,
  verifyPayment,
  getMonthlySales,
  getPaymentStatusCount,
  getAllPayments,
  test,
} = require("../controllers/paymentControllers");
const { protected } = require("../controllers/authControllers");
const router = express.Router();

router.post("/create/sessions", protected, createPaymentSession);
router.get("/verify", verifyPayment);

router.get("/error", test);

// app.use(restrict("admin")) only show for admin

router.get("/stats/monthlySales", getMonthlySales);
router.get("/stats/paymentStatusCount", getPaymentStatusCount);
router.route("/").get(getAllPayments);
module.exports = router;
