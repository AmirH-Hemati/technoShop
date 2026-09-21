import mongoose, { Document, Schema } from "mongoose";
import { slug } from "../utils/slug";

export interface IProduct extends Document {
  name: string;
  slug: string;
  category: mongoose.Types.ObjectId;
  description: string;
  price: number;
  priceDiscount: number;
  brand: {
    value: string;
    label: string;
  };
  imageCover: string;
  images: string[];
  colors: Array<{
    value: string;
    label: string;
    hex: string;
  }>;
  features: Array<{
    value: string;
    label: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    slug: String,
    category: {
      type: Schema.ObjectId,
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
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  this.slug = slug(this.name);
  next();
});

productSchema.pre(/^find/, function (next) {
  (this as mongoose.Query<any, any>).populate("category");
  next();
});

export default mongoose.model<IProduct>("Product", productSchema);