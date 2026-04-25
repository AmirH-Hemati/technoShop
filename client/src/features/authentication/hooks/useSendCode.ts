import { toast } from "react-toastify";

import { useMutation } from "@tanstack/react-query";

import type { AppError } from "@/types/AppError.type.js";

import { handelSendCode } from "../../../services/apiAuth.js";

export function useSendCode() {
  const { mutate: sendCode, isPending: isSending } = useMutation({
    mutationFn: (phoneNumber: number) => handelSendCode(phoneNumber),
    onSuccess: (data) => {
      console.log(data);
      toast.success(`"کد به شماره مربوطه ارسال گردید.  ${data.code}`);
    },

    onError: (err: AppError) => toast.error(err.response.data.message),
  });

  return { sendCode, isSending };
}
