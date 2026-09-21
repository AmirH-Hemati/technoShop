import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document {
  order: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  amount: number;
  status: "pending" | "success" | "failed";
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    transactionId: String,
  },
  { timestamps: true }
);

paymentSchema.pre(/^find/, function (next) {
  (this as mongoose.Query<any, any>).populate("user");
  next();
});

export default mongoose.model<IPayment>("Payment", paymentSchema);