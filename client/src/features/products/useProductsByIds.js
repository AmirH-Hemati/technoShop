import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getProductsByIds } from "../../services/apiProducts";
import { useShopingCart } from "../../context/ShopingCartContext";
export function useProductsByIds() {
  const { cartItems } = useShopingCart();
  const queryClient = useQueryClient();
  const {
    mutate: fetchProducts,
    data,
    isPending,
  } = useMutation({
    mutationFn: (ids) => getProductsByIds(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productsByIds"],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  const products = data?.map((product) => {
    const item = cartItems?.find((item) => item.id === product._id);
    return { ...product, qty: item?.qty || 1 };
  });
  return { fetchProducts, products, isPending };
}
