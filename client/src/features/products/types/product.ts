import type { Category } from "@/features/categories/types/category.js";

export interface Product {
  _id: string;
  name: string;
  category: Category;
  price: number;
  priceDiscount: number;
  brand: string;
  colors: string[];
  description: string;
  imageCover: string;
  images: string[];
  features: string[];
  createdAt: string;
  updatedAt: string;
  slug: string;
}
