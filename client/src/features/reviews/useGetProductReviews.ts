import { useQuery } from "@tanstack/react-query";

import { getProductReviews } from "@/services/apiProducts.js";

import type { CommentType } from "../comments/types/comment.js";

export function useGetProductReviews(productId: string) {
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery<CommentType[]>({
    queryKey: ["reviews", productId],
    queryFn: () => getProductReviews(productId),
  });

  return { reviews: reviews || [], isLoading, error };
}
