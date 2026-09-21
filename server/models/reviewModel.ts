import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  review: string;
  rating: number;
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    review: { type: String, required: true },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 4.7,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  (this as mongoose.Query<any, any>).populate("user").populate("product");
  next();
});

export default mongoose.model<IReview>("Review", reviewSchema);