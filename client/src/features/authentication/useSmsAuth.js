import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { handelSmsAuth } from "../../services/apiAuth";

export function useVerifySmsAuth() {
  const queryClient = useQueryClient();
  const { mutate: verifyCode, isPending: isVerifying } = useMutation({
    mutationFn: ({ phoneNumber, verificationCode }) =>
      handelSmsAuth(phoneNumber, verificationCode),
    onSuccess: ({ user }) => {
      toast.success("ورود با موفقیت انجام شد");
      queryClient.setQueryData(["user"], user);
    },

    onError: (err) => toast.error(err.response.data.message),
  });

  return { verifyCode, isVerifying };
}
