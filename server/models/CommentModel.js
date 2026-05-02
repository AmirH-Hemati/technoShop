const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    comment: { 
      type: String, 
      required: true,
      trim: true,
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
  { timestamps: true }
);

commentSchema.pre(/^find/, function (next) {
  this.populate("user").populate("product");

  next();
});
module.exports = mongoose.model("Comment", commentSchema);
