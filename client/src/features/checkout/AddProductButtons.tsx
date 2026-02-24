import { useShopingCart } from "@/context/ShopingCartContext.js";
import { Add, Minus, Trash } from "iconsax-reactjs";

type Props = { id: string };

function AddProductButtons({ id }: Props) {
  const {
    handleIncreaseProductQty,
    handleDecreaseProductQty,
    getProductQty,
    handleRemoveProduct,
  } = useShopingCart();
  const productQty = getProductQty(id);

  return (
    <div className="border-grey-400 flex items-center gap-3 rounded-sm border px-2 py-1">
      <button
        onClick={() => handleIncreaseProductQty(id)}
        className="cursor-pointer"
      >
        <Add size={20} className="text-grey-600" />
      </button>
      <span className="text-grey-900 text-100 flex items-center justify-center leading-none">
        {productQty}
      </span>
      <button
        onClick={() => handleDecreaseProductQty(id)}
        className="cursor-pointer"
      >
        <Minus size={20} className="text-grey-600" />
      </button>
    </div>
  );
}

export default AddProductButtons;
