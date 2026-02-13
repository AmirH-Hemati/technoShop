const mongoose = require("mongoose");
const { slug } = require("../utils/slug");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, " نام محصول الزامی است"],
    },
    slug: String,

    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "انتخاب دسته بندی الزامی است"],
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return this.isnNew ? val < this.price : true;
        },
        message: "  تخفیف {{VALUE}} باید کمتر از قیمت اصلی باشد",
      },
    },
    brand: {
      type: String,
      required: [true, "انتخاب برند محصول الزامی است"],
    },
    colors: [String],
    features: [{ key: String, value: String }],
    description: {
      type: String,
      trim: true,
      required: [true, "توضیحات محصول الزامی است"],
    },
    imageCover: {
      type: String,
      required: [true, "تصویر اصلی محصول الزامی است"],
    },
    images: [String],
  },
  { timestamps: true }
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
