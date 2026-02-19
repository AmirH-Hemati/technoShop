import { Edit, Location, Trash } from "iconsax-reactjs";
import { useCheckout } from "../../context/CheckoutCartContext.js";
import Button from "../../ui/Button.js";
import Modal from "../../ui/Modal.js";
import CreateAddressForm from "./CreateAddressForm.js";
import type { Address as AddressType } from "./types/address.js";
import CheckBox from "@/ui/CheckBox.js";
import ConfirmDelete from "@/ui/ConfirmDelete.js";
import { useDeleteAddress } from "./useDeleteAddress.js";

type Props = { address: AddressType; checkBox: boolean };

function Address({ address, checkBox = true }: Props) {
  const { selectedAddress, onSelectAddress } = useCheckout();
  const { deleteAddress, isDeleting } = useDeleteAddress();

  return (
    <li className="border-grey-300 bg-grey-0 shadow-3 flex flex-col items-start gap-4 rounded-lg border p-4 md:flex-row">
      <div className="flex items-start gap-0.5">
        {checkBox ? (
          <CheckBox
            checked={selectedAddress?._id === address?._id}
            onChange={() => onSelectAddress(address)}
          />
        ) : (
          <Location className="text-primary" />
        )}
      </div>

      <div className="text-grey-600 space-y-3 text-sm font-medium">
        <div className="text-primary flex flex-wrap gap-0.5 font-semibold">
          <span>{address?.title}</span>
          <span>
            {address?.city}، {address?.addressLine}
          </span>
        </div>

        <div className="flex flex-wrap gap-0.5">
          <span className="text-grey-900 font-bold">گیرنده:</span>
          <span>{address?.user?.name}</span>
          <span className="text-grey-500">،</span>
          <span>{address?.user?.phone}</span>
        </div>

        <div className="flex gap-0.5">
          <span className="text-grey-900 font-bold">کد پستی:</span>
          <span>{address?.postalCode}</span>
        </div>
      </div>

      <div className="mr-auto flex items-center justify-end gap-1 md:justify-start">
        <Modal>
          <Modal.Open open="deleteAddress">
            <Button size="small" variation="secondary">
              <Trash />
            </Button>
          </Modal.Open>

          <Modal.Open open="editAddress">
            <Button size="small" variation="secondary">
              <Edit />
            </Button>
          </Modal.Open>

          <Modal.Window name="deleteAddress">
            <ConfirmDelete
              resourceName="آدرس"
              onConfirm={() => deleteAddress(address?._id)}
              disabled={isDeleting}
            />
          </Modal.Window>

          <Modal.Window name="editAddress">
            <CreateAddressForm address={address} />
          </Modal.Window>
        </Modal>
      </div>
    </li>
  );
}

export default Address;
