import { useCheckout } from "@/context/CheckoutCartContext.js";

import AddressStep from "./AddressStep.js";
import CartStep from "./CartStep.js";
import CartSummary from "./CartSummary.js";
import PaymentStep from "./PaymentStep.js";
import Steps from "./Steps.js";

function CartDetails() {
  const { currentStep } = useCheckout();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">
      <div>
        {currentStep == 1 && <CartStep />}
        {currentStep == 2 && <AddressStep />}
        {currentStep == 3 && <PaymentStep />}
      </div>
      <div className="space-y-3">
        <div className="hidden md:block">
          <Steps />
        </div>
        <CartSummary />
      </div>
    </div>
  );
}

export default CartDetails;
