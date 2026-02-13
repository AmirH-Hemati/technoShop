import { toast } from "react-toastify";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEditProduct } from "../../services/apiProducts";

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: ({ newProductData, id }) =>
      createEditProduct(newProductData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("محصول با موفقیت ویرایش شد ");
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { updateProduct, isUpdating };
}
