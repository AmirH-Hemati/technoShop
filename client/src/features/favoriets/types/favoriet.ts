import type { ProductType } from "@/features/products/types/product.js";
import type { UserInfo } from "@/features/users/types/user.js";

export interface FavorietType {
  _id: string;
  product: ProductType;
  user: UserInfo;
  createdAt: string;
  updatedAt: string;
}
