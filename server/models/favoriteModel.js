const mongoose = require("mongoose");

const favorietsSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "محصول مورد علاقه الزامی است"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "حساب کاربری  الزامی است"],
    },
  },
  { timestamps: true }
);

favorietsSchema.index({ user: 1, product: 1 }, { unique: true });
favorietsSchema.pre(/^find/, function (next) {
  this.populate("product").populate("user");

  next();
});
module.exports = mongoose.model("Favoriet", favorietsSchema);
