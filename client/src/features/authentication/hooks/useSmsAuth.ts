import { toast } from "react-toastify";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { AppError } from "@/types/AppError.type.js";

import { handelSmsAuth } from "../../../services/apiAuth.js";

export function useVerifySmsAuth() {
  const queryClient = useQueryClient();
  const { mutate: verifyCode, isPending: isVerifying } = useMutation({
    mutationFn: ({
      phoneNumber,
      verificationCode,
    }: {
      phoneNumber: number;
      verificationCode: number;
    }) => handelSmsAuth(phoneNumber, verificationCode),
    onSuccess: ({ user }) => {
      toast.success("ورود با موفقیت انجام شد");
      queryClient.setQueryData(["user"], user);
    },

    onError: (err: AppError) => toast.error(err.response.data.message),
  });

  return { verifyCode, isVerifying };
}
