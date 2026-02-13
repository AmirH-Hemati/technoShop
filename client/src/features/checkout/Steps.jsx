import { Card, Location, ShoppingBag, TruckFast } from "iconsax-reactjs";
import { useCheckout } from "../../context/CheckoutCartContext";

const steps = [
  { id: 1, title: "سبد خرید شما ", icon: ShoppingBag },
  { id: 2, title: "ارسال اطلاعات", icon: Location },
  { id: 3, title: "پرداخت و ثبت نهایی", icon: Card },
];
function Steps() {
  const { currentStep } = useCheckout();
  return (
    <div className="flex flex-wrap gap-10 sm:flex-row md:items-center md:justify-center">
      {steps.map((step) => {
        return (
          <div key={step.id} className="flex items-center gap-2 text-sm">
            <div
              className={`bg-grey-0 border-grey-300 rounded-full border p-4 ${currentStep === step.id ? "bg-primary text-white" : "text-grey-900 bg-white"}`}
            >
              <step.icon size="40" />
            </div>
            <div className="flex flex-col gap-1">
              <span>مرحله {step.id}</span>
              <span className="text-grey-900 font-bold">{step.title}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Steps;
