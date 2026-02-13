import { Add, Minus, Trash } from "iconsax-reactjs";
import { useShopingCart } from "../../context/ShopingCartContext";

function AddProductButtons({ id }) {
  const {
    handelIncreaseProductQty,
    handelDecreaseProductQty,
    getProductQty,
    handelRemoveProduct,
  } = useShopingCart();
  const productQty = getProductQty(id);

  return (
    <div className="border-grey-400 flex items-center gap-3 rounded-lg border   px-0.5 p-1">
      <button
        onClick={() => handelIncreaseProductQty(id)}
        className="hover:bg-grey-100 cursor-pointer p-0.5"
      >
        <Add className="text-grey-600" />
      </button>
      <span className="text-grey-800 text-300 p-0.5 flex items-center justify-center">{productQty}</span>
      <button
        onClick={() => handelDecreaseProductQty(id)}
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
          onClick={() => handelRemoveProduct(id)}
          className="hover:bg-grey-100 cursor-pointer text-red-600"
        />
      )}
    </div>
  );
}

export default AddProductButtons;
