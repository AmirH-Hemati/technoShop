import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts.js";
import useProductFilter from "@/hooks/useFiltersProducts.js";

export function useProducts() {
  const { filters } = useProductFilter();

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts({ filters }),
  });

  return { products, isLoading, error, refetch };
}
