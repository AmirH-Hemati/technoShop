const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "فیلد حساب کاربری الزامی است"],
    },
    province: {
      type: String,
      required: [true, "استان الزامی است"],
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
    plate: {
      type: String,
      required: [true, "پلاک الزامی است"],
      trim: true,
    },
    unit: {
      type: String,
      required: [true, "واحد الزامی است"],
      trim: true,
    },

    fullAddress: {
      type: String,
      required: [true, "آدرس کامل الزامی است"],
      trim: true,
    },
    lat: {
      type: Number,
      required: [true, "مختصات جغرافیایی الزامی است"],
    },

    lng: {
      type: Number,
      required: [true, "مختصات جغرافیایی الزامی است"],
    },
    recipientName: {
      type: String,
      required: [true, "نام تحویل گیرنده الزامی است"],
      trim: true,
    },

    recipientPhone: {
      type: String,
      required: [true, "شماره تحویل گیرنده الزامی است"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
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
