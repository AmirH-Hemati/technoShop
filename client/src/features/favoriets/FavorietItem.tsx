import { Link } from "react-router-dom";
import { Information, MedalStar, Trash, TruckTime } from "iconsax-reactjs";

import { formatToman } from "@/utils/helper.js";

import { useDeleteFavoriet } from "./useDeleteFavoriet.js";
import type { FavorietType } from "./types/favoriet.js";

type Props = { favoriet: FavorietType };
function FavorietItem({ favoriet }: Props) {
  const { product } = favoriet;
  const { isDeleting, deleteFavoriet } = useDeleteFavoriet();
  return (
    <li className="bg-grey-0 grid cursor-pointer gap-1 rounded-md p-4 shadow-sm">
      <img src={product.imageCover} alt={product.name} />
      <div className="space-y-1.5">
        <p className="text-300 line-clamp-2">{product.name}</p>

        <div className="text-100 flex w-full flex-wrap items-center justify-between">
          <div className="bg-grey-200 flex items-center gap-1 rounded-full px-2 py-0.5">
            <TruckTime size={18} color="#ED2E2E" />
            <span className="text-grey-800">ارسال رایگان</span>
          </div>
          <div className="flex items-center text-yellow-600">
            <span>4.4</span>
            <MedalStar size={20} />
          </div>
        </div>

        <p className="text-200 text-left font-bold">
          {formatToman(product.price)}
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => deleteFavoriet(favoriet._id)}
            disabled={isDeleting}
            className="disabled:bg-grey-200 text-100 flex cursor-pointer items-center justify-center gap-1 rounded-md border border-red-500 px-2 py-1 text-center leading-none font-semibold disabled:cursor-not-allowed"
          >
            <Trash size={18} />
            <span> حذف</span>
          </button>
          <Link
            to={`/products/${product.slug}`}
            className="border-primary text-primary text-100 flex w-full cursor-pointer items-center justify-center gap-1 rounded-md border-2 px-2 py-1 leading-none font-bold"
          >
            <Information size={18} />
            <span>مشاهده جزئیات</span>
          </Link>
        </div>
      </div>
    </li>
  );
}

export default FavorietItem;
