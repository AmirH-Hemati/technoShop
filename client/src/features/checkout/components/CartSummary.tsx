import { Button } from "@/components/ui/button.js";

import { useCheckout } from "@/context/CheckoutCartContext.js";
import { useShopingCart } from "@/context/ShopingCartContext.js";

import { formatToman } from "@/utils/helper.js";

import { useCreateOrder } from "../../orders/hooks/useCreateOrder.js";

function CartSummary() {
  const { onNext, products, currentStep, selectedAddress } = useCheckout();

  const { cartQty, cartItems } = useShopingCart();

  const { createOrder, isCreateing } = useCreateOrder();

  const totalPrice = products?.reduce(
    (acc, cur) => acc + cur.price * cur.qty,
    0,
  );

  const totalDiscount = products?.reduce(
    (acc, cur) => acc + cur.priceDiscount * cur.qty,
    0,
  );
  const isDisabled =
    (currentStep === 1 && (!products || products.length === 0)) ||
    (currentStep === 2 && (!selectedAddress || !selectedAddress?._id));

  function handelCheckoutProducts() {
    createOrder({ orders: cartItems, address: selectedAddress });
  }

  return (
    <div className="border-grey-200 bg-grey-0 text-200 text-grey-900 flex h-fit flex-col gap-5 rounded-md border p-4 font-medium">
      <div className="flex items-center justify-between">
        <span>قیمت کالا ها ({cartQty()})</span>
        <span>{isDisabled ? "_" : formatToman(totalPrice)}</span>
      </div>

      <div className="flex items-center justify-between">
        <span> هزینه ارسال </span>
        <span> {isDisabled ? "_" : "رایگان"} </span>
      </div>

      <div className="flex items-center justify-between text-red-500">
        <span>سود شما از خرید</span>
        <span>{isDisabled ? "_" : formatToman(totalDiscount)}</span>
      </div>

      <div className="flex items-center justify-between">
        <span> جمع سبد خرید </span>
        <span>
          {isDisabled ? "_" : formatToman(totalPrice - totalDiscount)}
        </span>
      </div>

      <div className="border-grey-300 border-2 border-dashed" />

      <Button
        onClick={currentStep === 3 ? handelCheckoutProducts : onNext}
        disabled={currentStep === 3 ? isCreateing : isDisabled}
      >
        {currentStep === 1 && "تایید و تکمیل سفارش"}
        {currentStep === 2 && "ثبت آدرس"}
        {currentStep === 3 && "پرداخت با درگاه زرین پال"}
      </Button>

      <p className="text-grey-500 text-100 -mt-3 font-normal">
        هزینه این سفارش هنوز پرداخت نشده و در صورت اتمام موجودی کالاها از سبد
        خرید حذف میشنود.
      </p>
    </div>
  );
}

export default CartSummary;
