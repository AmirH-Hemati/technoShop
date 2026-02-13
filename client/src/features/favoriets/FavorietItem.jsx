import { Information, Shop, ShoppingCart, Trash } from "iconsax-reactjs";
import { BASE_URL } from "../../services/axiosInstance";
import { Link } from "react-router-dom";
import { useDeleteFavoriet } from "./useDeleteFavoriet";
function FavorietItem({ favoriet }) {
  const { product } = favoriet;
  const { isDeleting, deleteFavoriet } = useDeleteFavoriet();
  return (
    <li className="shadow-2 bg-grey-0 hover:shadow-1 flex h-72 cursor-pointer flex-col gap-3 overflow-hidden rounded-xl p-3">
      <img
        src={`${BASE_URL}img/products/${product.imageCover}`}
        alt={product.name}
        className="h-28 object-cover md:h-32 lg:h-40"
      />
      <div className="space-y-6">
        <p className="line-clamp-2 text-center text-base leading-normal font-medium">
          {product.name}
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => deleteFavoriet(favoriet._id)}
            disabled={isDeleting}
            className="disabled:bg-grey-200 flex cursor-pointer items-center justify-center gap-1 rounded-md border border-red-500 px-2 py-1 text-center text-xs font-semibold disabled:cursor-not-allowed"
          >
            <Trash size={20} />
            <span> حذف</span>
          </button>
          <Link
            to={`/products/${product.slug}`}
            className="border-primary text-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 px-2 py-1 text-xs font-bold hover:scale-105"
          >
            <Information size={20} />
            <span>مشاهده جزئیات</span>
          </Link>
        </div>
      </div>
    </li>
  );
}

export default FavorietItem;
