import { useCheckout } from "../../context/CheckoutCartContext";
import AddressStep from "./AddressStep";
import CartStep from "./CartStep";
import CartSummary from "./CartSummary";
import PaymentStep from "./PaymentStep";
function CartDetails() {
  const { currentStep } = useCheckout();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">
      <div >
        {currentStep == 1 && <CartStep />}
        {currentStep == 2 && <AddressStep />}
        {currentStep == 3 && <PaymentStep />}
      </div>

      <CartSummary />
    </div>
  );
}

export default CartDetails;
