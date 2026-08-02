import { useQuery } from "@tanstack/react-query";

import useProductFilter from "@/hooks/useFiltersProducts.js";
import { getProducts } from "@/services/apiProducts.js";



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
    retry : false
  });

  return { products, isLoading, error, refetch };
}
