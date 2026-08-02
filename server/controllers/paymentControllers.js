const AppError = require("../utils/AppError");
const Product = require("../models/productModel");
const Payment = require("../models/paymentModel");
const Order = require("../models/orderModel");
const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const { getAll } = require("./handlerFactory");

let html;
const createSession = async (totalAmount, paymentId, req) => {
  const params = {
    merchant_id: process.env.MERCHANT_ID,
    amount: totalAmount,
    callback_url: `${process.env.CLIENT_URL}/verify?paymentId=${paymentId}`,
    description: "خرید از فروشگاه",
  };

  try {
    const { data } = await axios.post(
      `${process.env.ZARINPAL_URL}/v4/payment/request.json`,
      params,
    );
    console.log("this is here for test payment controller");
    return data;
  } catch (error) {
    console.log(error.response);
    throw new AppError("خطا در برقراری ارتباط با درگاه پرداخت", 400);
  }
};

exports.test = (req, res) => {
  console.log(html);
  res.status(200).set("Content-Type", "text/html; charset=utf-8").send(html);
};
exports.createPaymentSession = catchAsync(async (req, res, next) => {
  const { orders, address } = req.body;

  if (!orders || !orders.length === 0) {
    return next(new AppError("سبد خرید شما خالی است", 400));
  }

  if (!address) {
    return next(new AppError("آدرس وجود ندارد", 400));
  }

  const productsIds = orders.map((order) => order.id);
  const products = await Product.find({ _id: { $in: productsIds } });

  if (products.length !== orders.length) {
    return next(new AppError("برخی از محصولات موجود نیستند", 400));
  }

  const totalAmount = products.reduce((totalProduct, product) => {
    const itemQuantity =
      orders?.find((order) => order.id.toString() == product._id.toString())
        ?.qty || 1;
    const price = parseFloat(product.price) || 0;
    const discount = parseFloat(product.priceDiscount) || 0;
    return totalProduct + (price - discount) * itemQuantity;
  }, 0);

  const newOrders = orders.map((order) => ({
    product: order.id,
    quantity: order.qty,
    color: order.color,
  }));

  const newOrder = await Order.create({
    address,
    orderItems: newOrders,
    totalAmount,
    user: req.user._id,
    status: "processing",
  });

  const newPayment = await Payment.create({
    order: newOrder._id,
    user: req.user._id,
    amount: totalAmount,
    status: "pending",
  });

  const session = await createSession(totalAmount, newPayment._id, req);
  if (session.data.code === 100) {
    newPayment.transactionId = session.data.authority;
    newOrder.payment = newPayment._id;
    await newPayment.save();
    await newOrder.save();
    const url = `${process.env.ZARINPAL_URL}/StartPay/${session.data.authority}`;
    return res.status(200).json({ status: "success", data: { url } });
  }

  return next(
    new AppError("عملیات پرداخت ناموفق بود . لطفا بعدا دوباره تلاش کنید", 400),
  );
});

exports.verifyPayment = catchAsync(async (req, res, next) => {
  const { authority, status, paymentId } = req.query;
  if (!authority || !status || !paymentId) {
    return next(new AppError(" مشخصات پرداخت کامل نیست ", 400));
  }

  const payment = await Payment.findOne({
    transactionId: authority,
    _id: paymentId,
  }).populate("order");

  if (!payment) {
    return next(new AppError("مشخصات تراکنش پیدا نشد", 400));
  }

  if (status !== "OK") {
    payment.status = "failed";
    await payment.save();
    return res.status(200).json({
      status: "failed",
      order: payment.order,
      paymentStatus: payment.status,
    });
  }

  const params = {
    merchant_id: process.env.MERCHANT_ID,
    amount: payment.amount,
    authority: payment.transactionId,
  };

  const { data } = await axios.post(
    `${process.env.ZARINPAL_URL}/v4/payment/verify.json`,
    params,
  );

  if (data.data.code === 100 || data.data.code === 101) {
    payment.status = "success";
  } else {
    payment.status = "failed";
  }
  await payment.save();

  return res.status(200).json({
    status: payment.status === "success" ? "success" : "failed",
    order: payment.order,
    paymentStatus: payment.status,
  });
});

exports.getMonthlySales = catchAsync(async (req, res, next) => {
  const monthlySales = await Payment.aggregate([
    {
      $match: {
        status: "success",
      },
    },

    {
      $group: {
        _id: {
          $month: "$createdAt",
        },
        totalSales: {
          $sum: 1,
        },
        totalAmountSales: {
          $sum: "$amount",
        },
      },
    },
    {
      $project: {
        _id: false,
        month: "$_id",
        totalSales: true,
        totalAmountSales: true,
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: monthlySales,
  });
});

exports.getPaymentStatusCount = catchAsync(async (req, res, next) => {
  const statusCount = await Payment.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: false,
        status: "$_id",
        count: true,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: statusCount,
  });
});

exports.getAllPayments = getAll(Payment);
