import mongoose, { Document, Schema } from "mongoose";

export interface IFavorite extends Document {
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const favoritesSchema = new Schema<IFavorite>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

favoritesSchema.index({ user: 1, product: 1 }, { unique: true });
favoritesSchema.pre(/^find/, function (next) {
  (this as mongoose.Query<any, any>).populate("product").populate("user");
  next();
});

export default mongoose.model<IFavorite>("Favorite", favoritesSchema);