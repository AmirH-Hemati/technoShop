import { Add } from "iconsax-reactjs";
import Modal from "../../ui/Modal.js";
import CreateAddressForm from "../addresses/CreateAddressForm.js";
import { useCheckout } from "@/context/CheckoutCartContext.js";
import Addresses from "../addresses/Addresses.js";

function AddressStep() {
  const { selectedAddress } = useCheckout();

  return (
    <div className="space-y-4">
      <div className="shadow-2 border-grey-200 flex max-h-[550px] flex-col overflow-y-auto rounded-xl border p-2">
        <p className="p-4 text-base font-bold">آدرس های شما</p>
        {(!selectedAddress || !selectedAddress?._id) && (
          <p className="p-4 text-sm font-medium text-red-600">
            لطفا آدرس تحویل کالای خود را انتخاب کنید
          </p>
        )}

        <Addresses />
      </div>

      <Modal>
        <Modal.Open open="addressForm">
          <button className="border-grey-300 bg-grey-0 shadow-2 text-grey-900 flex h-32 w-full cursor-pointer items-center justify-center rounded-xl border p-4 text-sm font-medium md:h-52 md:text-base">
            <Add />
            <span>افزودن آدرس جدید</span>
          </button>
        </Modal.Open>

        <Modal.Window name="addressForm" closeButton>
          <CreateAddressForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddressStep;
