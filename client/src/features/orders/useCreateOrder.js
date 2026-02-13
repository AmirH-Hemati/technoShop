import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createOrder as createOrderApi } from "../../services/apiOrders";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const {
    mutate: createOrder,
    isPending: isCreateing,
    data,
  } = useMutation({
    mutationFn: ({ orders, address }) => createOrderApi(orders, address),
    onSuccess: (data) => {
      window.location.href = data.url;
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { createOrder, isCreateing, data };
}
