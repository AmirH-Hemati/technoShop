import { Add } from "iconsax-reactjs";
import { useCheckout } from "@/context/CheckoutCartContext.js";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.js";
import Addresses from "@/features/addresses/components/Addresses.js";
import { Button } from "@/components/ui/button.js";
import AddressPicker from "@/features/addresses/components/AddressPicker.js";

function AddressStep() {
  const { selectedAddress } = useCheckout();

  return (
    <div className="flex flex-col gap-2">
      <p className="text-200 border-grey-100 text-grey-800 my-2 border-b py-2 font-medium">
        آدرس های شما
      </p>
      {(!selectedAddress || !selectedAddress?._id) && (
        <p className="text-100 font-medium text-red-500">
          لطفا آدرس تحویل کالای خود را انتخاب کنید
        </p>
      )}
      <Addresses checkBox />

      <div className="mr-auto">
        <Dialog>
          <DialogTrigger>
            <Button variant="outline">
              <Add />
              <span>افزودن آدرس جدید</span>
            </Button>
          </DialogTrigger>
          <DialogContent
            showCloseButton={false}
            className="!w-full overflow-auto sm:!max-h-[85vh] sm:!max-w-2xl"
            style={{ scrollbarWidth: "thin" }}
          >
            <AddressPicker />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default AddressStep;
