import { toast } from "react-toastify";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { AppError } from "@/types/AppError.type.js";

import { deleteFavoriet as deleteFavorietApi } from "../../../services/apiFavoriets.js";

export function useDeleteFavoriet() {
  const queryClient = useQueryClient();
  const { mutate: deleteFavoriet, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteFavorietApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favoriets"],
      });
      toast.success("محصول از علاقه مندی ها حذف شد ");
    },
    onError: (err: AppError) => toast.error(err?.response?.data.message),
  });

  return { deleteFavoriet, isDeleting };
}
