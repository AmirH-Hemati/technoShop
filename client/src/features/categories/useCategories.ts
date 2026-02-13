import { getCategories } from "@/services/apiCategories.js";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return { categories, isLoading, error, refetch };
}
