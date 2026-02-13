const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    transactionId: String,
  },
  { timestamps: true }
);

PaymentSchema.pre(/^find/, function (next) {
  this.populate("user");
  next();
});
module.exports = mongoose.model("Payment", PaymentSchema);
