import { useQuery } from "@tanstack/react-query";
import { getLatestProducts } from "../../../services/apiProducts.js";

export function useLatestProducts() {
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products", "latestProduct"],
    queryFn: getLatestProducts,
  });

  return { products, isLoading, error, refetch };
}
