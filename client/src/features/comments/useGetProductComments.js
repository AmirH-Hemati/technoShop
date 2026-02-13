import { useQuery } from "@tanstack/react-query";
import { getProductComments } from "../../services/apiProducts";

export function useGetProductComments(productId) {
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getProductComments(productId),
  });

  return { comments, isLoading, error };
}
