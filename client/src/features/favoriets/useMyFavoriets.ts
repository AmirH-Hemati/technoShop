import { useQuery } from "@tanstack/react-query";
import { getMyFavoriets } from "../../services/apiFavoriets.js";

export function useMyFavoriets() {
  const {
    data: favoriets = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["favoriets"],
    queryFn: getMyFavoriets,
  });

  return { favoriets, isLoading, error, refetch };
}
