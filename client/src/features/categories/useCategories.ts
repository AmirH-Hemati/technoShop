import { getCategories } from "@/services/apiCategories.js";
import { useQuery } from "@tanstack/react-query";
import type { CategoryType } from "./types/category.js";

export function useCategories() {
  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useQuery<CategoryType[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return { categories: categories || [], isLoading, error, refetch };
}
