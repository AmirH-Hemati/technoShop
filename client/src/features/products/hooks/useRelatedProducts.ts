import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../../../services/apiProducts.js";
import type { ProductType } from "../types/product.js";

export function useRelatedProducts(category: string) {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<ProductType[]>({
    queryKey: ["products", category],
    queryFn: () => getProductsByCategory(category),
  });

  return { products: products || [], isLoading, error };
}
