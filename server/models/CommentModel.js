const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: [true, "عنوان کامنت الزامی است"] },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "نویسنده  کامنت الزامی است"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "محصول  کامنت الزامی است"],
    },
  },
  { timestamps: true }
);

commentSchema.pre(/^find/, function (next) {
  this.populate("user").populate("product");

  next();
});
module.exports = mongoose.model("Comment", commentSchema);
