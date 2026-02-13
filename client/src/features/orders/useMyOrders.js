import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../../services/apiOrders";
import { useSearchParams } from "react-router-dom";

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
