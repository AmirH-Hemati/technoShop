const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: { type: String, required: [true, "عنوان بازخورد الزامی است"] },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 4.7,
      required: [true, "امتیاز  بازخورد الزامی است"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "نویسنده  بازخورد الزامی است"],
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "محصول  بازخورد الزامی است"],
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate("user").populate("product");

  next();
});

module.exports = mongoose.model("Review", reviewSchema);
