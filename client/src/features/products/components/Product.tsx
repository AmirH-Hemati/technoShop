import { MedalStar, TruckTime } from "iconsax-reactjs";
import { Link } from "react-router-dom";

import type { ProductType } from "../types/product.js";
import { memo } from "react";
import AddProductToFavoriet from "@/features/favoriets/components/AddProductToFavoriet.js";
import { formatToman } from "@/utils/helper.js";
import Button from "@/ui/Button.js";

type Props = { product: ProductType };
const Product = memo(function Product({ product }: Props) {
  const percentDiscount = Math.round(
    (product.priceDiscount / product.price) * 100,
  );
  console.log("render", product._id);
  return (
    <div className="bg-grey-0 relative flex h-80 flex-col rounded-xl p-3 shadow-md hover:scale-105">
      <div className="flex h-10 w-full items-center justify-between">
        {percentDiscount > 0 && (
          <span className="text-100 flex items-center gap-1 rounded-full bg-red-500 px-3 py-1 font-bold text-white shadow">
            <span>{percentDiscount}%</span>
            <span className="opacity-80">تخفیف</span>
          </span>
        )}

        <AddProductToFavoriet productId={product._id} className="mr-auto" />
      </div>
      <Link
        to={`/products/${product.slug}`}
        className="flex flex-1 flex-col items-center justify-between gap-1"
      >
        <img
          src={product.imageCover}
          alt={product.name}
          className="h-36 object-cover"
        />
        <p className="text-grey-900 text-300 line-clamp-2 text-center leading-[140%] font-bold">
          {product.name}
        </p>
        <div className="text-100 flex w-full flex-wrap items-center justify-between">
          <div className="bg-grey-200 flex items-center gap-1 rounded-full px-2 py-0.5">
            <TruckTime size={18} color="#ED2E2E" />
            <span className="text-grey-800">ارسال رایگان</span>
          </div>
          <div className="flex items-center justify-end gap-1 font-semibold">
            <span className="text-grey-800">(نظر 43)</span>
            <div className="flex items-center text-yellow-600">
              <span>4.4</span>
              <MedalStar size={20} />
            </div>
          </div>
        </div>

        <div className="mr-auto flex flex-col items-center justify-center">
          <Button size="small">
            {formatToman(product.price - product.priceDiscount)}
          </Button>
          {percentDiscount > 0 && (
            <span className="text-100 font-bold text-gray-500 line-through">
              {formatToman(product.price)}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
});

export default Product;
