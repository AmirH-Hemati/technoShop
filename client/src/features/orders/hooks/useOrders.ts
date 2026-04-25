import { useQuery } from "@tanstack/react-query";

import { getOrders } from "../../../services/apiOrders.js";

export function useOrders() {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  return { orders, isLoading, error };
}
