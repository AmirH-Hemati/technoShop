import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../services/apiProducts.js";
import type { Product } from "../types/product.js";

export function useProduct(): {
  product: Product | undefined;
  isLoading: boolean;
} {
  const { slug } = useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProduct(slug as string),
  });

  return { product, isLoading };
}
