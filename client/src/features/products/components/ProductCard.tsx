import { Link } from "react-router-dom";

import { formatToman } from "@/utils/helper.js";

import type { ProductType } from "../types/product.js";

type Props = { product: ProductType };
export default function ProductCard({ product }: Props) {
  return (
    <Link to={`/products/${product.slug}`}>
      <li className="bg-grey-0 mt-2 flex items-center gap-3 border-grey-200  p-3 border-b">
        <img
          src={product.imageCover}
          alt={product.name}
          className="h-20 object-cover"
        />

        <div className="flex flex-col justify-center gap-1">
          <h3 className="text-grey-800 font-bold">{product.name}</h3>
          <p className="text-grey-600 text-xs font-medium">
            {formatToman(product.price)}
          </p>
        </div>
      </li>
    </Link>
  );
}
