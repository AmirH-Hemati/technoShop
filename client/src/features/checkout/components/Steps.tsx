import { Card, Location, ShoppingBag } from "iconsax-reactjs";
import { useCheckout } from "../../../context/CheckoutCartContext.js";

const steps = [
  { id: 1, title: "سبد خرید ", icon: ShoppingBag },
  { id: 2, title: "ثبت نشانی", icon: Location },
  { id: 3, title: "پرداخت", icon: Card },
];

function Steps() {
  const { currentStep } = useCheckout();

  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => {
        return (
          <div key={step.id} className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-1">
              <step.icon size="22" className="text-grey-900" />
              <span className="text-grey-900 text-100 text-center font-medium">
                {step.title}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="mx-2 flex items-center">
                <div className="bg-grey-300 relative h-0.5 w-20 rounded">
                  <div
                    className={`bg-primary absolute top-0 left-0 h-0.5 rounded ${
                      currentStep > step.id ? "w-full" : "w-0"
                    }`}
                  />

                  <div
                    className={`absolute top-1/2 -left-2 h-2 w-2 -translate-y-1/2 rounded-full border transition-all duration-300 ${
                      currentStep > step.id
                        ? "bg-primary border-primary"
                        : "bg-grey-300"
                    }`}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Steps;
