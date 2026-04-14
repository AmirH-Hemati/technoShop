import { ChartSquare, ShoppingCart, Star1, Verify } from "iconsax-reactjs";
import { formatToman } from "@/utils/helper.js";
import Button from "@/ui/Button.js";
import { useShopingCart } from "@/context/ShopingCartContext.js";
import AddProductToFavoriet from "../favoriets/AddProductToFavoriet.js";
import AddProductButtons from "../checkout/AddProductButtons.js";
import type { ProductType } from "./types/product.js";

type Props = { product: ProductType };

function ProductInfo({ product }: Props) {
  const { name, slug, _id: id, price, colors } = product;
  const { handleIncreaseProductQty, getProductQty } = useShopingCart();

  const productQty = getProductQty(id);

  return (
    <div className="mt-4 space-y-2 px-1 md:mt-0 md:px-3 lg:px-6">
      <div className="flex items-start justify-between">
        <h1 className="text-500 leading-relaxed font-bold text-grey-900">{name}</h1>

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
              className="h-6 w-6 rounded-md border border-gray-300"
              style={{ backgroundColor: color.hex }}
            />
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

      <p className="text-500 font-medium text-grey-900">{formatToman(price)}</p>

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
