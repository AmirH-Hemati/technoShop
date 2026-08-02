import { toast } from "react-toastify";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userAuthStore } from "@/context/AuthStore.js";

import { handelSmsAuth } from "../../../services/apiAuth.js";

export function useVerifySmsAuth() {
  const loginStore = userAuthStore((state) => state.login);

  const queryClient = useQueryClient();
  const { mutate: verifyCode, isPending: isVerifying } = useMutation({
    mutationFn: ({
      phoneNumber,
      verificationCode,
    }: {
      phoneNumber: string;
      verificationCode: string;
    }) => handelSmsAuth(phoneNumber, verificationCode),
    onSuccess: ({ user }) => {
      toast.success("ورود با موفقیت انجام شد");
      queryClient.setQueryData(["user"], user);
      loginStore();
    },

    onError: (err: any) => toast.error(err.response.data.message),
  });

  return { verifyCode, isVerifying };
}
