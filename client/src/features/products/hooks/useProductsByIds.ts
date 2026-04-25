import { toast } from "react-toastify";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useShopingCart } from "../../../context/ShopingCartContext.js";
import { getProductsByIds } from "../../../services/apiProducts.js";
import type { ProductType } from "../types/product.js";

export function useProductsByIds() {
  const { cartItems } = useShopingCart();
  const queryClient = useQueryClient();
  const {
    mutate: fetchProducts,
    data,
    isPending,
  } = useMutation({
    mutationFn: (ids: string[]) => getProductsByIds(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productsByIds"],
      });
    },
    onError: (error) => toast.error(error.response.data.message),
  });

  const products = data?.map((product: ProductType) => {
    const item = cartItems?.find((item) => item.id === product._id);
    return { ...product, qty: item?.qty || 1, color: item?.color };
  });
  return { fetchProducts, products, isPending };
}
