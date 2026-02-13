import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateCurrentUser } from "../../services/apiAuth";
export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("حساب کاربری با موفقیت اپدیت شد ");
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { updateUser, isUpdating };
}
