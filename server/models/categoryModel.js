const mongoose = require("mongoose");
const { slug } = require("../utils/slug");

const categorySchema = new mongoose.Schema(
  {
    label: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "دسته بندی باید یک عنوان داشته باشد."],
    },

    value: String,
    image: {
      type: String,
      required: [true, "دسته بندی باید یک تصویر داشته باشد"],
    },
  },
  { timestamps: true }
);

categorySchema.pre("save", function (next) {
  this.value = slug(this.label);
  next();
});

module.exports = mongoose.model("Category", categorySchema);
