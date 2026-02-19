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
    <div className="border-grey-400 flex items-center gap-3 rounded-lg border p-1 px-0.5">
      <button
        onClick={() => handleIncreaseProductQty(id)}
        className="hover:bg-grey-100 cursor-pointer p-0.5"
      >
        <Add className="text-grey-600" />
      </button>
      <span className="text-grey-800 text-300 flex items-center justify-center p-0.5">
        {productQty}
      </span>
      <button
        onClick={() => handleDecreaseProductQty(id)}
        className="hover:bg-grey-100 cursor-pointer p-0.5"
      >
        {productQty > 1 ? (
          <Minus className="text-grey-600" />
        ) : (
          <Trash className="text-grey-600" />
        )}
      </button>

      {productQty > 1 && (
        <Trash
          onClick={() => handleRemoveProduct(id)}
          className="hover:bg-grey-100 cursor-pointer text-red-600"
        />
      )}
    </div>
  );
}

export default AddProductButtons;
