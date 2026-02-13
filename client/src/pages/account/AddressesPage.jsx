import { Add } from "iconsax-reactjs";
import CreateAddressForm from "../../features/addresses/CreateAddressForm";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import Addresses from "../../features/addresses/Addresses";
import BackButton from "../../ui/BackButton";

function AddressesPage() {
  return (
    <div className="mb-20 space-y-5 md:mb-0">
      <BackButton />
      <div className="bg-grey-0 shadow-2 h-full space-y-6 rounded-xl border border-gray-300 p-6">
        <div className="flex items-center justify-between">
          <Heading type="h3">آدرس ها</Heading>

          <Modal>
            <Modal.Open open="addressForm">
              <button className="flex cursor-pointer items-center justify-center rounded-md text-base font-medium text-red-500">
                <Add />
                <span>افزودن آدرس جدید</span>
              </button>
            </Modal.Open>

            <Modal.Window name="addressForm">
              <CreateAddressForm />
            </Modal.Window>
          </Modal>
        </div>

        <Addresses checkBox={false} />
      </div>
    </div>
  );
}

export default AddressesPage;
