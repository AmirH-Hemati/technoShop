import { CloseSquare, Colorfilter, Tag } from "iconsax-reactjs";

import { formatToman } from "@/utils/helper.js";
import { cn } from "@/lib/utils.js";

import AddProductButtons from "./AddProductButtons.js";
import type { ProductType } from "../products/types/product.js";

import Styles from "./cartItem.module.css";

function CartItem({ product }: { product: ProductType }) {
  const {
    imageCover,
    name,
    price,
    priceDiscount,
    _id: id,
    brand,
    category,
    color,
  } = product;

  return (
    <li
      className={cn(
        Styles["cartItem-area"],
        "bg-grey-0 md:border-grey-200 w-full py-1 md:space-y-1 md:rounded-md md:border md:p-3",
      )}
    >
      <img
        src={imageCover}
        alt={name}
        className="border-grey-100 h-0 min-h-full max-w-26 rounded-md border object-cover [grid-area:image] sm:max-w-none"
      />

      <div className="flex items-start justify-between [grid-area:name]">
        <h3 className="text-grey-900 text-400 font-semibold">{name}</h3>
        <CloseSquare size={20} className="text-grey-900 cursor-pointer" />
      </div>

      <div className="text-200 text-grey-600 [grid-area:category]">
        <p> {category.label} </p>
      </div>

      <p className="text-200 text-red-500 line-through [grid-area:price]">
        {formatToman(price)}
      </p>

      <p className="text-300 text-grey-900 font-bold [grid-area:discountPrice]">
        {formatToman(price - priceDiscount)}
      </p>

      <div className="text-200 text-grey-600 space-y-2 [grid-area:options]">
        <div className="flex items-center gap-0.5">
          <Tag size={19} />
          <span>برند : {brand.label}</span>
        </div>

        <div className="flex items-center gap-0.5">
          <Colorfilter size={19} />
          <div className="flex items-center">
            <span>رنگ : {color.label}</span>

            <span
              className="h-4 w-4 rounded-md border border-gray-300"
              style={{ backgroundColor: color.hex }}
            />
          </div>
        </div>
      </div>

      <AddProductButtons id={id} className="mr-auto [grid-area:buttons]" />
    </li>
  );
}

export default CartItem;
