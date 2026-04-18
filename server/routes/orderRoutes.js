const express = require("express");
const { protected } = require("../controllers/authControllers");
const {
  getOrders,
  getMyOrders,
  getOrder,
  test,
  getRecentOrder,
} = require("../controllers/orderControllers");

const router = express.Router();

router.use(protected);
router.get("/myOrders", getMyOrders);
router.get("/recentOrder/:userId", getRecentOrder);

// app.use(restrict("admin")) admin only

router.get("/", getOrders);
router.route("/:id").get(getOrder);
// .delete(deleteFavoriet);

module.exports = router;
