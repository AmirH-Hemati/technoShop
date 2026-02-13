import { useQuery } from "@tanstack/react-query";
import {getProductsByCategory } from "../../services/apiProducts";

export function useRelatedProducts(category) {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", category],
    queryFn: () => getProductsByCategory(category),
  });

  return { products, isLoading, error };
}
