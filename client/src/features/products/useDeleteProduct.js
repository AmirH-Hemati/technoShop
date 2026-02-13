import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProduct as deleteProductApi } from "../../services/apiProducts";

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteProductApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("محصول با موفقیت حذف شد ");
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { deleteProduct, isDeleting };
}
