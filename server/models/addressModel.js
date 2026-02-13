const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "فیلد حساب کاربری الزامی است"],
    },
    title: {
      type: String,
      required: [true, "عنوان آدرس الزامی است"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "شهر الزامی است"],
      trim: true,
    },
    postalCode: {
      type: String,
      required: [true, "کد پستی الزامی است"],
      trim: true,
    },
    addressLine: {
      type: String,
      required: [true, "آدرس کامل الزامی است"],
      trim: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
addressSchema.pre(/^find/, function (next) {
  this.populate("user", "phone  name");
  next();
});
module.exports = mongoose.model("Address", addressSchema);

// validate: {
//   validator: function (v) {
//     return /^\d{8}$/.test(v);
//   },
//   message: "کد پستی باید 10 رقم باشد",
// },
