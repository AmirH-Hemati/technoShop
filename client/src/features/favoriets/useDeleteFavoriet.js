import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFavoriet as deleteFavorietApi } from "../../services/apiFavoriets";

export function useDeleteFavoriet() {
  const queryClient = useQueryClient();
  const { mutate: deleteFavoriet, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteFavorietApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favoriets"],
      });
      toast.success("محصول از علاقه مندی ها حذف شد ");
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { deleteFavoriet, isDeleting };
}
