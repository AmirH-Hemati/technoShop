import { useQuery } from "@tanstack/react-query";
import { getMyAddresses } from "../../services/apiAddresses";

export function useMyAddresses() {
  const {
    data: addresses,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["addresses"],
    queryFn: getMyAddresses,
  });

  return { addresses, isLoading, error, refetch };
}
