import { useQuery } from "@tanstack/react-query";

import { useSearchParams } from "react-router-dom";

import { getMyOrders } from "../../../services/apiOrders.js";

export function useMyOrders() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "processing";
  const {
    data: orders = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["MyOrders", status],
    queryFn: () => getMyOrders(status),
  });

  return { orders, isLoading, error, refetch };
}
