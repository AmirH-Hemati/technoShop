import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/apiProducts";

export function useProduct() {
  const { slug } = useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProduct(slug),
  });

  return { product, isLoading };
}
