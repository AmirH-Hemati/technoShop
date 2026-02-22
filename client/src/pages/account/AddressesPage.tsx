import { Add } from "iconsax-reactjs";
import CreateAddressForm from "../../features/addresses/CreateAddressForm.js";
import Heading from "../../ui/Heading.js";
import Modal from "../../ui/Modal.js";
import Addresses from "../../features/addresses/Addresses.js";
import BackButton from "../../ui/BackButton.js";
import { CheckoutProvider } from "@/context/CheckoutCartContext.js";
import { Button } from "@/components/ui/button.js";
import AddressPicker from "@/features/addresses/AddressPicker.js";

function AddressesPage() {
  return (
    <CheckoutProvider>
      <div className="mb-20 space-y-5 md:mb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BackButton />
            <Heading type="h2">آدرس ها</Heading>
          </div>
          <Modal>
            <Modal.Open open="addressForm">
              <Button variant="outline">
                <Add />
                <span>افزودن آدرس جدید</span>
              </Button>
            </Modal.Open>

            <Modal.Window name="addressForm">
              <AddressPicker />
            </Modal.Window>
          </Modal>
        </div>
        <div className="bg-grey-0 shadow-2 h-full space-y-6 rounded-xl border border-gray-300 p-6">
          <div className="flex items-center justify-between"></div>

          <Addresses checkBox={false} />
        </div>
      </div>
    </CheckoutProvider>
  );
}

export default AddressesPage;
