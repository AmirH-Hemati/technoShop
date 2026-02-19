import { getProductReviews } from "@/services/apiProducts.js";
import { useQuery } from "@tanstack/react-query";

export function useGetProductReviews(productId: string) {
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => getProductReviews(productId),
  });

  return { reviews, isLoading, error };
}
