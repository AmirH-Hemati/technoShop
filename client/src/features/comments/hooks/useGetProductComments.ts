import { useQuery } from "@tanstack/react-query";
import { getProductComments } from "../../../services/apiProducts.js";
import type { CommentType } from "../types/comment.js";

export function useGetProductComments(productId: string) {
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery<CommentType[]>({
    queryKey: ["comments", productId],
    queryFn: () => getProductComments(productId),
  });

  return { comments: comments || [], isLoading, error };
}
