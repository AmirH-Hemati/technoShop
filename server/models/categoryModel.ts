import mongoose, { Document, Schema } from "mongoose";
import { slug } from "../utils/slug";

export interface ICategory extends Document {
  label: string;
  value: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
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

export default mongoose.model<ICategory>("Category", categorySchema);