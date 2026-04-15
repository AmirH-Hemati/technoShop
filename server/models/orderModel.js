const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "حداقل تعداد باید ۱ باشد."],
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, " سفارش  باید متعلف به یک حساب کاربری باشد."],
    },
    totalAmount: {
      type: Number,
      required: [true, " سفارش  باید قیمت کل را داشته  باشد."],
    },
    address: {
      city: {
        type: String,
        required: [true, " سفارش  باید  شهر را داشته  باشد."],
      },
      fullAddress: {
        type: String,
        required: [true, " سفارش  باید  آدرس را داشته  باشد."],
      },
      postalCode: {
        type: String,
        required: [true, " سفارش  باید  کد پستی را داشته  باشد."],
      },
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    status: {
      type: String,
      enum: ["processing", "shipped", "delivered"],
      default: "processing",
    },
  },
  { timestamps: true },
);

orderSchema.pre(/^find/, function (next) {
  this.populate("orderItems.product")
    .populate("user", "name phone")
    .populate("payment", "status");
  next();
});
module.exports = mongoose.model("Order", orderSchema);
