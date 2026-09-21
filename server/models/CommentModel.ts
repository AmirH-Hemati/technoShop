import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  comment: string;
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
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

commentSchema.pre(/^find/, function (next) {
  (this as mongoose.Query<any, any>).populate("user").populate("product");
  next();
});

export default mongoose.model<IComment>("Comment", commentSchema);