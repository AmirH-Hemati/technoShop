import { Category, CloseSquare, Colorfilter, Tag } from "iconsax-reactjs";

import { formatToman } from "@/utils/helper.js";

import AddProductButtons from "./AddProductButtons.js";
import type { ProductType } from "../products/types/product.js";

function CartItem({ product }: { product: ProductType }) {
  const {
    imageCover,
    name,
    price,
    priceDiscount,
    _id: id,
    brand,
    category,
    colors,
  } = product;

  return (
    <li className="bg-grey-0 md:border-grey-200 flex w-full flex-col py-1 md:flex-row md:items-center md:rounded-md md:border md:p-3">
      <div className="flex w-full items-start md:hidden">
        <div className="flex flex-col">
          <img
            src={imageCover}
            alt={name}
            className="h-18 w-18 rounded-md border border-gray-100 object-cover"
          />

          <div className="text-100 text-grey-700 mt-1 space-y-0.5 text-right">
            <div className="flex items-center gap-0.5">
              <Tag size={16} />
              <span>{brand}</span>
            </div>

            <div className="flex items-center gap-0.5">
              <Colorfilter size={16} />
              <span>{colors}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-1">
          <div className="space-y-0.5">
            <div className="flex items-start justify-between">
              <h3 className="text-200 text-grey-900 font-semibold">{name}</h3>
              <CloseSquare size={20} className="text-grey-900 cursor-pointer" />
            </div>
            <p className="text-100 text-grey-600">{category.label}</p>
          </div>

          <div className="mr-auto flex flex-col items-end gap-1">
            <span className="text-100 text-red-500 line-through">
              {formatToman(price)}
            </span>
            <span className="text-200 block font-medium">
              {formatToman(price - priceDiscount)}
            </span>
            <AddProductButtons id={id} />
          </div>
        </div>
      </div>

      <div className="hidden w-full md:flex md:items-start md:gap-4">
        <div className="w-52">
          <img src={imageCover} alt={name} className="border-grey-100 border" />
        </div>

        <div className="flex w-full flex-col space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="text-300 text-grey-900 font-semibold">{name}</h3>
            <CloseSquare size={20} className="text-grey-900 cursor-pointer" />
          </div>

          <div className="text-200 text-grey-600 flex items-center gap-0.5">
            <Category size={16} />
            <p>دسته بندی : {category.label} </p>
          </div>
          <div className="text-200 text-grey-600 flex gap-4">
            <div className="flex items-center gap-0.5">
              <Tag size={18} />
              <span>برند : {brand} </span>
            </div>

            <div className="flex items-center gap-0.5">
              <Colorfilter size={18} />
              <span>رنگ : {colors}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <span className="text-200 text-red-500 line-through">
                {formatToman(price)}
              </span>
              <span className="text-300 font-medium">
                {formatToman(price - priceDiscount)}
              </span>
            </div>

            <AddProductButtons id={id} />
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
