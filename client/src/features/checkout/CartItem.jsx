import { Cardano, DollarCircle, ShieldTick, TruckFast } from "iconsax-reactjs";
import { formatToman } from "../../utils/helper";
import AddProductButtons from "./AddProductButtons";

function CartItem({ product }) {
  const { imageCover, name, price, priceDiscount, _id: id } = product;

  return (
    <li className="border-grey-200 bg-grey-0 flex w-full flex-col rounded-lg border p-3 shadow-sm md:flex-row">
      <div className="w-50">
        <img src={imageCover} alt={name} className="border border-gray-100" />
      </div>

      <div className="w-full px-1 md:px-3">
        <h3 className="text-400 text-grey-900 font-normal">{name}</h3>

        <ul className="text-200 space-y-0.5">
          <li className="text-grey-600 flex items-center gap-1">
            <ShieldTick />
            <span>گارانتی سلامت کالا</span>
          </li>
          <li className="text-grey-600 flex items-center gap-1">
            <Cardano />
            <span>تکنو لایف</span>
          </li>
          <li className="text-grey-600 flex items-center gap-1">
            <DollarCircle />
            <span>ارسال رایگان</span>
          </li>
          <li className="text-grey-600 flex items-center gap-1">
            <TruckFast />
            <span>ارسال در سریع ترین زمان</span>
          </li>
        </ul>

        <div className="flex w-full flex-wrap items-center justify-between">
          <div className="space-x-2">
            <span className="text-200 font-normal text-red-500 line-through">
              {formatToman(price)}
            </span>
            <span className="text-300 font-medium">
              {formatToman(price - priceDiscount)}
            </span>
          </div>

          <AddProductButtons id={id} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
