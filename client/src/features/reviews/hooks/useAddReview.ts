import { toast } from "react-toastify";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createReview } from "@/services/apiReviews.js";

export function useAddReview() {
  const queryClient = useQueryClient();
  const { mutate: addReview, isPending: isCreating } = useMutation({
    mutationFn: ({
      review,
      rating,
      productId,
    }: {
      review: string;
      rating: number;
      productId: string;
    }) => createReview(review, rating, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      toast.success("بازخورد شما  با موفقیت ثبت شد");
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { addReview, isCreating };
}
