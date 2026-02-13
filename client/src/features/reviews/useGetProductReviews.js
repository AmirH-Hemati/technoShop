import { useQuery } from "@tanstack/react-query";
import { getProductReviews } from "../../services/apiProducts";

export function useGetProductReviews(productId) {
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
