import {
  ChartSquare,
  Check,
  ShoppingCart,
  Star1,
  TickSquare,
  Verify,
} from "iconsax-reactjs";
import { formatToman } from "@/utils/helper.js";
import Button from "@/ui/Button.js";
import { useShopingCart } from "@/context/ShopingCartContext.js";
import type { ProductType } from "../types/product.js";
import { useState } from "react";
import { cn } from "@/lib/utils.js";
import type { Color } from "@/data/colors.js";
import { CheckCheck, CheckIcon } from "lucide-react";
import AddProductToFavoriet from "@/features/favoriets/components/AddProductToFavoriet.js";
import AddProductButtons from "@/features/checkout/components/AddProductButtons.js";

type Props = { product: ProductType };

function ProductInfo({ product }: Props) {
  const { name, slug, _id: id, price, colors, priceDiscount } = product;
  const { handleIncreaseProductQty, getProductQty } = useShopingCart();

  const [selectedColor, setSelectedColor] = useState<Color>(
    product.colors[0] as Color,
  );

  const productQty = getProductQty(id);

  return (
    <div className="mt-4 space-y-2 px-1 md:mt-0 md:px-3 lg:px-6">
      <div className="flex items-start justify-between">
        <h1 className="text-500 text-grey-900 w-[90%] leading-relaxed font-bold">
          {name}
        </h1>

        <AddProductToFavoriet productId={product?._id} />
      </div>

      <p className="text-200 font-normal text-gray-500">{slug}</p>

      <div className="border-grey-200 flex w-fit items-center gap-2 border-b pb-2">
        <span className="text-200 text-gray-600">امتیاز کاربران:</span>

        <div className="flex items-center gap-0.5 text-yellow-500">
          <Star1 variant="Bold" size="20" />
          <Star1 variant="Bold" size="20" />
          <Star1 variant="Bold" size="20" />
          <Star1 variant="Bold" size="20" />
          <Star1 variant="Bold" size="20" />
        </div>

        <span className="text-100 text-gray-400">(۴.۸ از ۵)</span>
      </div>

      <div className="border-grey-200 w-fit space-y-2 border-b pb-3">
        <p className="text-200 font-medium">رنگ های موجود:</p>
        <div className="flex items-center gap-1">
          {colors.map((color) => (
            <span
              className={cn(
                "flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border-4 border-gray-300",
                selectedColor?.hex === color.hex && "border-primary border-4",
              )}
              style={{ backgroundColor: color.hex }}
              onClick={() => setSelectedColor(color)}
            >
              {selectedColor?.hex === color.hex && (
                <CheckIcon
                  className={cn(color.hex === "#000000" && "text-grey-0")}
                />
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="text-200 flex items-center justify-between text-gray-700">
        <div className="flex items-center">
          <Verify className="text-primary" size={32} />
          <span>گارانتی ۱۸ ماهه</span>
        </div>
        <div className="md:hidden">
          <Button variation="secondary">
            <span>مقایسه</span>
            <ChartSquare />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <p className="text-500 text-grey-900 font-medium">
          {formatToman(price - priceDiscount)}
        </p>
        <p className="text-300 font-medium text-red-500 line-through">
          {formatToman(price)}
        </p>
      </div>
      <div className="mt-2 flex gap-3">
        {productQty > 0 ? (
          <AddProductButtons id={id} color={selectedColor} />
        ) : (
          <Button
            full
            size="large"
            onClick={() => handleIncreaseProductQty(id, selectedColor)}
          >
            <span>افزودن به سبد خرید</span>
            <ShoppingCart />
          </Button>
        )}

        <div className="hidden md:block">
          <Button variation="secondary" size="large">
            <span>مقایسه</span>
            <ChartSquare />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
