import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createEditAddress } from "../../services/apiAddresses.js";
import type { CreateAddressType } from "./types/address.js";

export function useCreateAddress() {
  const queryClient = useQueryClient();
  const { mutate: createAddress, isPending: isCreateing } = useMutation({
    mutationFn: (newAddress: CreateAddressType) =>
      createEditAddress(newAddress),
    onSuccess: () => {
      toast.success(" آدرس  با موفقیت ساخته شد ");
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { createAddress, isCreateing };
}
