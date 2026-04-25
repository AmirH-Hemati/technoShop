import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createEditAddress } from "../../../services/apiAddresses.js";
import type { Address } from "../types/address.js";

export function useUpdateAddress() {
  const queryClient = useQueryClient();
  const { mutate: updateAddress, isPending: isUpdating } = useMutation({
    mutationFn: ({ newAddress, id }: { newAddress: Address; id: string }) =>
      createEditAddress(newAddress, id),
    onSuccess: () => {
      toast.success(" آدرس با موفقیت ویرایش شد ");
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { updateAddress, isUpdating };
}
