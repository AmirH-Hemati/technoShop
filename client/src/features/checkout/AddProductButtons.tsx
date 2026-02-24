import { useShopingCart } from "@/context/ShopingCartContext.js";
import { cn } from "@/lib/utils.js";
import { Add, Minus, Trash } from "iconsax-reactjs";

type Props = { id: string; className: string };

function AddProductButtons({ id, className }: Props) {
  const {
    handleIncreaseProductQty,
    handleDecreaseProductQty,
    getProductQty,
    handleRemoveProduct,
  } = useShopingCart();
  const productQty = getProductQty(id);

  return (
    <div
      className={cn(
        className,
        "border-grey-400 flex items-center gap-3 rounded-sm border px-3 py-1",
      )}
    >
      <button
        onClick={() => handleIncreaseProductQty(id)}
        className="cursor-pointer"
      >
        <Add size={22} className="text-grey-600" />
      </button>
      <span className="text-grey-900 text-200 font-medium flex items-center justify-center leading-none">
        {productQty}
      </span>
      <button
        onClick={() => handleDecreaseProductQty(id)}
        className="cursor-pointer"
      >
        <Minus size={22} className="text-grey-600" />
      </button>
    </div>
  );
}

export default AddProductButtons;
