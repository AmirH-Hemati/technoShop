const Order = require("../models/orderModel");
const catchAsync = require("../utils/catchAsync");
const { getAll, getOne } = require("./handlerFactory");

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const { status } = req.query;
  const filter = { user: req.user._id };
  if (status) {
    filter.status = status;
  }

  const orders = await Order.find(filter);
  res.status(200).json({
    status: "success",
    data: orders,
  });
});

exports.getRecentOrder = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.params.userId });
  res.status(200).json({
    status: "success",
    data: orders,
  });
});

exports.getOrders = getAll(Order);
exports.getOrder = getOne(Order);
