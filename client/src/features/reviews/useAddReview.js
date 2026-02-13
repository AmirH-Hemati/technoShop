import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createReview } from "../../services/apiReviews";

export function useAddReview() {
  const queryClient = useQueryClient();
  const { mutate: addReview, isPending: isCreateing } = useMutation({
    mutationFn: ({ review, rating, productId }) =>
      createReview(review, rating, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      toast.success("بازخورد شما  با موفقیت ثبت شد");
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { addReview, isCreateing };
}
