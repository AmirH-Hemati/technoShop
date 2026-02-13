import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress as deleteAddressApi } from "../../services/apiAddresses";

export function useDeleteAddress() {
  const queryClient = useQueryClient();
  const { mutate: deleteAddress, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteAddressApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses"],
      });
      toast.success("آدرس با موفقیت حذف شد ");
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { deleteAddress, isDeleting };
}
