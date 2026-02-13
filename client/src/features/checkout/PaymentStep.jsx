import { Wallet1 } from "iconsax-reactjs";
import CheckBox from "../../ui/CheckBox";

function PaymentStep() {
  return (
    <div className="border-grey-300 bg-grey-0 shadow-2 h-64 rounded-xl border">
      <p className="p-4 text-lg font-bold">شیوه پرداخت</p>
      <div className="border-grey-300 h-1 border-b border-dashed" />
      <div className="p-4">
        <div className="flex items-center gap-6">
          <CheckBox checked />
          <div className="bg-primary  text-grey-0 flex h-12 w-12 items-center justify-center rounded-md">
            <Wallet1 size={38} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-black">پرداخت آنلاین</span>
            <span className="text-grey-600 text-sm font-normal">
              قابل پرداخت با تمامی کارت های عضو شتاب
            </span>
          </div>
        </div>
      </div>

      <div className="cursor-not-allowed p-4 grayscale">
        <div className="flex items-center gap-6">
          <input
            type="checkbox"
            className="accent-primary focus:ring-primary h-6 w-6 focus:ring-2 focus:ring-offset-2"
            disabled
          />
          <div className="bg-primary text-grey-0 flex h-12 w-12 items-center justify-center rounded-md">
            <Wallet1 size={38} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-black">پرداخت در محل</span>
            <span className="text-grey-600 text-sm font-normal">به زودی</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentStep;
