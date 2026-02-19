import { ChartSquare, ShoppingCart, Star1, Verify } from "iconsax-reactjs";
import type { Product } from "./types/product.js";
import { formatToman } from "@/utils/helper.js";
import Button from "@/ui/Button.js";
import { useShopingCart } from "@/context/ShopingCartContext.js";
import AddProductToFavoriet from "../favoriets/AddProductToFavoriet.js";
import AddProductButtons from "../checkout/AddProductButtons.js";

type Props = { product: Product };

function ProductInfo({ product }: Props) {
  const { name, slug, _id: id, price } = product;
  const { handleIncreaseProductQty, getProductQty } = useShopingCart();

  const productQty = getProductQty(id);

  return (
    <div className="mt-4 space-y-3 px-1 md:mt-0 md:px-3 lg:px-6">
      <div className="flex items-start justify-between">
        <h1 className="max-w-xs text-lg leading-relaxed font-semibold md:text-2xl">
          {name}
        </h1>

        <AddProductToFavoriet productId={product?._id} />
      </div>

      <p className="text-xs font-normal text-gray-500 md:text-sm">{slug}</p>

      <div className="border-grey-200 flex w-fit items-center gap-2 border-b pb-3">
        <span className="text-xs text-gray-600 md:text-sm">
          امتیاز کاربران:
        </span>

        <div className="flex items-center gap-0.5 text-yellow-500">
          <Star1 variant="Bold" size="20" />
          <Star1 variant="Bold" size="20" />
          <Star1 variant="Bold" size="20" />
          <Star1 variant="Bold" size="20" />
          <Star1 variant="Bold" size="20" />
        </div>

        <span className="text-xs text-gray-400">(۴.۸ از ۵)</span>
      </div>

      <div className="border-grey-200 w-fit space-y-1 border-b pb-3">
        <span className="text-sm font-semibold">رنگ:</span>
        <span className="text-xs text-gray-500">(مشکی)</span>
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-md border border-gray-300 bg-black" />
        </div>
      </div>

      <div className="flex items-center justify-between text-base text-gray-700">
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

      <p className="text-3xl font-bold text-gray-900">{formatToman(price)}</p>

      <div className="mt-2 flex gap-3">
        {productQty > 0 ? (
          <AddProductButtons id={id} />
        ) : (
          <Button
            full
            size="large"
            onClick={() => handleIncreaseProductQty(id)}
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
