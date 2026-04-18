import { useCheckout } from "@/context/CheckoutCartContext.js";
import Address from "../addresses/Address.js";
import { formatToman } from "@/utils/helper.js";

function PaymentStep() {
  const { selectedAddress, products } = useCheckout();

  return (
    <div className="space-y-6">
      <p className="text-300 border-grey-100 text-grey-800 my-2 border-b py-2 font-medium">
        انتخاب نحوه پرداخت
      </p>
      <p className="text-200 text-grey-800">
        لطفا از درست بودن اطلاعات خود اطمینان حاصل فرمایید
      </p>
      <div>
        <p className="text-300 border-grey-100 text-grey-800 my-2 border-b py-2 font-medium">
          خلاصه محصولات
        </p>
        <ul className="divide-grey-100 space-y-4 divide-y-2">
          {products?.map((item) => (
            <li key={item._id} className="flex justify-between py-3">
              <img
                src={item.imageCover}
                alt={item.name}
                className="h-20 rounded-md object-cover"
              />

              <div className="mr-2 flex flex-1 flex-col justify-between">
                <h3 className="text-grey-900 text-300 font-semibold">
                  {item.name}
                </h3>

                <div className="text-grey-600 text-100 md:text-200 flex flex-col gap-0.5 md:flex-row md:gap-4">
                  <span>{item.brand.label}</span>

                  <div className="flex items-center gap-1">
                    <span
                      className="h-4 w-4 rounded-md border border-gray-300"
                      style={{ backgroundColor: item.color.hex }}
                    />
                  </div>

                  <span className="text-grey-600">{item.qty} عدد</span>
                </div>
              </div>

              <div className="text-200 text-grey-900 self-end font-medium">
                {formatToman(item.price - item.priceDiscount)}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-300 border-grey-100 text-grey-800 my-2 border-b py-2 font-medium">
          آدرس انتخابی شما
        </p>
        <Address address={selectedAddress} index={1} />
      </div>
    </div>
  );
}

export default PaymentStep;
