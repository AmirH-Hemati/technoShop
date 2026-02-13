import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createEditCategory } from "../../services/apiCategories";

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const { mutate: updateCategory, isPending: isUpdating } = useMutation({
    mutationFn: ({ newCategoryData, id }) =>
      createEditCategory(newCategoryData, id),
    onSuccess: () => {
      toast.success("دسته بندی با موفقیت ویرایش شد ");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { updateCategory, isUpdating };
}
