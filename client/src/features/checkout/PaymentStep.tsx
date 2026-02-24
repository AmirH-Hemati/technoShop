import { useCheckout } from "@/context/CheckoutCartContext.js";
import Address from "../addresses/Address.js";
import { formatToman } from "@/utils/helper.js";

function PaymentStep() {
  const { selectedAddress, products } = useCheckout();

  return (
    <div className="space-y-6">
      <p className="text-200 border-grey-100 text-grey-800 my-2 border-b py-2 font-medium">
        انتخاب نحوه پرداخت
      </p>
      <p className="text-100 text-grey-800">
        لطفا از درست بودن اطلاعات خود اطمینان حاصل فرمایید
      </p>
      <div>
        <p className="text-200 border-grey-100 text-grey-800 my-2 border-b py-2 font-medium">
          خلاصه محصولات
        </p>
        <ul className="space-y-4 p-4">
          {products?.map((item) => (
            <li
              key={item._id}
              className="flex items-center justify-between gap-4"
            >
              <img
                src={item.imageCover}
                alt={item.name}
                className="h-16 w-16 rounded-md object-cover"
              />

              <div className="flex flex-1 flex-col justify-between gap-2">
                <span className="text-grey-900 text-200 font-semibold">
                  {item.name}
                </span>

                <span className="text-grey-600 text-100">{item.qty} تعداد</span>
              </div>

              <div className="text-100 text-grey-900 font-medium">
                {formatToman(item.price - item.priceDiscount)}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-200 border-grey-100 text-grey-800 my-2 border-b py-2 font-medium">
          آدرس انتخابی شما
        </p>
        <Address address={selectedAddress} index={1} />
      </div>
    </div>
  );
}

export default PaymentStep;
