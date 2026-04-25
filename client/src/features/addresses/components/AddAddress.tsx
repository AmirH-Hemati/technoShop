import Button from "../../../ui/Button.js";
import Modal from "../../../ui/Modal.js";
import CreateAddressForm from "./CreateAddressForm.js";

function AddCategory() {
  return (
    <>
      <Modal>
        <Modal.Open open="addCategory">
          <Button>اضافه کردن دسته بندی</Button>
        </Modal.Open>

        <Modal.Window name="addCategory">
          <CreateAddressForm />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default AddCategory;
