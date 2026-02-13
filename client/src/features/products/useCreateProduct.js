import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditProduct } from "../../services/apiProducts";
import { toast } from "react-toastify";
export function useCreateProduct() {
  const queryClient = useQueryClient();
  const { mutate: createProduct, isPending: isCreateing } = useMutation({
    mutationFn: (newProduct) => createEditProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("محصول با موفقیت ساخته شد ");
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { createProduct, isCreateing };
}
