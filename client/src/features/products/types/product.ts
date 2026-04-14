import type { Color } from "@/data/colors.js";
import type { CategoryType } from "@/features/categories/types/category.js";
import type { SelectOptionType } from "@/types/select-option-types.js";

export interface ProductType {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  priceDiscount: number;
  category: CategoryType;
  brand: SelectOptionType;
  imageCover: string;
  images: string[];
  colors: Color[];
  features: string[];
  createdAt: string;
  updatedAt: string;
}
