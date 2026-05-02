const mongoose = require("mongoose");
const { slug } = require("../utils/slug");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    slug: String,

    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceDiscount: {
      type: Number,
      default: 0,
    },
    brand: {
      type: {
        value: { type: String, required: true },
        label: { type: String, required: true },
      },
      required: true,
    },
    imageCover: {
      type: String,
      required: [true, "تصویر اصلی محصول الزامی است"],
    },
    images: {
      type: [String],
      required: true,
    },
    colors: {
      type: [
        {
          value: { type: String, required: true },
          label: { type: String, required: true },
          hex: { type: String, required: true },
        },
      ],
      required: true,
    },
    features: {
      type: [
        {
          value: { type: String, required: true },
          label: { type: String, required: true },
        },
      ],
      required: true,
    },
  },
  { timestamps: true },
);

productSchema.pre("save", function (next) {
  this.slug = slug(this.name);
  next();
});

productSchema.pre(/^find/, function (next) {
  this.populate("category");
  next();
});

module.exports = mongoose.model("Product", productSchema);
