import { useQuery } from "@tanstack/react-query";

import { getMyFavoriets } from "@/services/apiFavoriets.js";

import type { FavorietType } from "../types/favoriet.js";

export function useMyFavoriets() {
  const {
    data: favoriets = [],
    isLoading,
    error,
    refetch,
  } = useQuery<FavorietType[]>({
    queryKey: ["favoriets"],
    queryFn: getMyFavoriets,
  });

  return { favoriets: favoriets || [], isLoading, error, refetch };
}
