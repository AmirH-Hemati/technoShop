import { CheckoutProvider } from "@/context/CheckoutCartContext.js";
import CartDetails from "@/features/checkout/components/CartDetails.js";
import Steps from "@/features/checkout/components/Steps.js";

function Cart() {
  return (
    <CheckoutProvider>
      <div className="my-6 space-y-10">
        <div className="block md:hidden">
          <Steps />
        </div>

        <CartDetails />
      </div>
    </CheckoutProvider>
  );
}

export default Cart;
