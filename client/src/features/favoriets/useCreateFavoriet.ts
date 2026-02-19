import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { createFavoriet as createFavorietApi } from "../../services/apiFavoriets.js";

export function useCreateFavoriet() {
  const queryClient = useQueryClient();
  const { mutate: createFavoriet, isPending: isCreateing } = useMutation({
    mutationFn: (productId: string) => createFavorietApi(productId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["favoriets"],
      });
      console.log(data.message);
      toast.success(data.message);
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { createFavoriet, isCreateing };
}
