import { useQuery } from "@tanstack/react-query";

import { getMyAddresses } from "../../../services/apiAddresses.js";
import type { Address } from "../types/address.js";

export function useMyAddresses(): {
  addresses: Address[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
} {
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
