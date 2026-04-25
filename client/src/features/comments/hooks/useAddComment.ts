import { toast } from "react-toastify";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createComment } from "@/services/apiComments.js";

export function useAddComment() {
  const queryClient = useQueryClient();
  const { mutate: addComment, isPending: isCreateing } = useMutation({
    mutationFn: ({
      comment,
      productId,
    }: {
      comment: string;
      productId: string;
    }) => createComment(comment, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      toast.success("کامنت با موفقیت ثبت شد");
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { addComment, isCreateing };
}
