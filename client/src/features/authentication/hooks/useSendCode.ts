import { toast } from "react-toastify";

import { useMutation } from "@tanstack/react-query";


import { handelSendCode } from "../../../services/apiAuth.js";

export function useSendCode() {
  const { mutate: sendCode, isPending: isSending } = useMutation({
    mutationFn: (phoneNumber: string) => handelSendCode(phoneNumber),
    onSuccess: (data) => {
      toast.success(`"کد به شماره مربوطه ارسال گردید.  ${data.code}`);
    },

    onError: (err: any) => toast.error(err.response.data.message),
  });

  return { sendCode, isSending };
}
