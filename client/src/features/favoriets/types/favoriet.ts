import type { Product } from "@/features/products/types/product.js";
import type { UserInfo } from "@/features/users/types/user.js";

export interface Favoriet {
  _id: string;
  product: Product;
  user: UserInfo;
  createdAt: string;
  updatedAt: string;
}
