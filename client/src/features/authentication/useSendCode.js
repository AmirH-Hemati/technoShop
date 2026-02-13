import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { handelSendCode } from "../../services/apiAuth";
export function useSendCode() {
  const { mutate: sendCode, isPending: isSending } = useMutation({
    mutationFn: (phoneNumber) => handelSendCode(phoneNumber),
    onSuccess: (data) => {
      console.log(data);
      toast.success(`"کد به شماره مربوطه ارسال گردید.  ${data.code}`);
    },

    onError: (err) => toast.error(err.response.data.message),
  });

  return { sendCode, isSending };
}
