const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: { type: String, required: true },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 4.7,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true },
);

reviewSchema.pre(/^find/, function (next) {
  this.populate("user").populate("product");

  next();
});

module.exports = mongoose.model("Review", reviewSchema);
