import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  orderItems: Array<{
    product: mongoose.Types.ObjectId;
    quantity: number;
    color?: {
      value: string;
      label: string;
      hex: string;
    };
  }>;
  user: mongoose.Types.ObjectId;
  totalAmount: number;
  address: {
    city: string;
    fullAddress: string;
    postalCode: string;
  };
  payment?: mongoose.Types.ObjectId;
  status: "processing" | "shipped" | "delivered";
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "حداقل تعداد باید ۱ باشد."],
        },
        color: {
          value: { type: String },
          label: { type: String },
          hex: { type: String },
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, " سفارش  باید متعلف به یک حساب کاربری باشد."],
    },
    totalAmount: {
      type: Number,
      required: [true, " سفارش  باید قیمت کل را داشته  باشد."],
    },
    address: {
      city: {
        type: String,
        required: [true, " سفارش  باید  شهر را داشته  باشد."],
      },
      fullAddress: {
        type: String,
        required: [true, " سفارش  باید  آدرس را داشته  باشد."],
      },
      postalCode: {
        type: String,
        required: [true, " سفارش  باید  کد پستی را داشته  باشد."],
      },
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
    status: {
      type: String,
      enum: ["processing", "shipped", "delivered"],
      default: "processing",
    },
  },
  { timestamps: true }
);

orderSchema.pre(/^find/, function (next) {
  (this as mongoose.Query<any, any>)
    .populate("orderItems.product")
    .populate("user", "name phone")
    .populate("payment", "status");
  next();
});

export default mongoose.model<IOrder>("Order", orderSchema);