import { Add } from "iconsax-reactjs";

import { CheckoutProvider } from "@/context/CheckoutCartContext.js";
import { Button } from "@/components/ui/button.js";
import AddressPicker from "@/features/addresses/AddressPicker.js";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.js";
import BackButton from "@/ui/BackButton.js";
import Heading from "@/ui/Heading.js";
import Addresses from "@/features/addresses/Addresses.js";

function AddressesPage() {
  return (
    <CheckoutProvider>
      <div className="mb-20 space-y-5 md:mb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BackButton />
            <Heading type="h2">آدرس ها</Heading>
          </div>

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

        <Addresses checkBox={false} />
      </div>
    </CheckoutProvider>
  );
}

export default AddressesPage;
