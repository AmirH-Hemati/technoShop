const express = require("express");
const { protected } = require("../controllers/authControllers");
const {
  getOrders,
  getMyOrders,
  getOrder,
  test,
} = require("../controllers/orderControllers");

const router = express.Router();

router.use(protected);
router.get("/myOrders", getMyOrders);
router.get("/preOrderProduct", test);

// app.use(restrict("admin")) admin only

router.get("/", getOrders);
router.route("/:id").get(getOrder);
// .delete(deleteFavoriet);

module.exports = router;
