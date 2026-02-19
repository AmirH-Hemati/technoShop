import { MedalStar, TruckTime } from "iconsax-reactjs";
import { Link } from "react-router-dom";
import Button from "../../ui/Button.js";
import { formatToman } from "../../utils/helper.js";
import type { Product } from "./types/product.js";

function ProductItem({ product }: { product: Product }) {
  const percentDiscount = Math.round(
    (product.priceDiscount / product.price) * 100,
  );
  return (
    <Link to={`/products/${product.slug}`}>
      <div className="bg-grey-0 relative flex max-h-72 flex-row gap-2 rounded-xl p-2 shadow-md hover:scale-105 md:flex-col md:items-center md:justify-between md:p-4">
        <div className="hidden w-full md:flex md:items-center md:justify-between">
          {percentDiscount > 0 && (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
              % {percentDiscount}
            </span>
          )}
        </div>

        <img
          src={product.imageCover}
          alt={product.name}
          className="w-20 object-cover md:w-auto"
        />

        <div className="flex w-full flex-1 flex-col gap-1">
          <p className="text-grey-900 line-clamp-2 text-right text-xs leading-normal font-normal md:text-center md:text-sm md:font-bold">
            {product.name}
          </p>

          <div className="text-100 flex w-full flex-wrap items-center justify-between">
            <div className="bg-grey-200 flex items-center gap-1 rounded-full px-2 py-0.5 leading-[180%]">
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

          <div className="mt-1 mr-auto flex w-full items-start justify-between md:block md:w-fit">
            <div className="flex items-center justify-between md:hidden">
              {percentDiscount > 0 && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  % {percentDiscount}
                </span>
              )}
            </div>

            <div className="flex flex-col items-center justify-center">
              <Button size="small">
                {formatToman(product.price - product.priceDiscount)}
              </Button>
              {percentDiscount > 0 && (
                <span className="text-[12px] font-bold text-gray-500 line-through">
                  {formatToman(product.price)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
