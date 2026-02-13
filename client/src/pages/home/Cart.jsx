import CartDetails from "../../features/checkout/CartDetails";
import Steps from "../../features/checkout/Steps";
import { CheckoutProvider } from "../../context/CheckoutCartContext";

function Cart() {
  return (
    <CheckoutProvider>
      <div className="my-12 space-y-10">
        <Steps />

        <CartDetails />
      </div>
    </CheckoutProvider>
  );
}

export default Cart;
