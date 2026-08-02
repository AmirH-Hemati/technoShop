import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@/services/apiProducts.js";

import useProductFilter from "@/hooks/useFiltersProducts.js";

export function useSearchProducts(search: string) {
  const { filters } = useProductFilter();

  const { categories, brands, colors, maxPrice, minPrice, sort } = filters;
  const { data: products, isLoading } = useQuery({
    queryKey: ["searchProducts", search, filters],
    queryFn: () => getProducts({ filters, search }),
  });

  return { products, isLoading };
}
