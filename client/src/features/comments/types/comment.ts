import type { ProductType } from "@/features/products/types/product.js";
import type { UserInfo } from "@/features/users/schema/user.js";

export interface CommentType {
  _id: string;
  comment: string;
  user: UserInfo;
  product: ProductType;
  createdAt: string;
  updatedAt: string;
}
