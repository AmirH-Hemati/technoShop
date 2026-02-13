import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";

export function useSearchProducts(search) {
  const { data: products, isLoading } = useQuery({
    queryKey: ["searchProducts", search],
    queryFn: () => getProducts({ filters: [], sort: [], search }),
  });

  return { products, isLoading };
}
