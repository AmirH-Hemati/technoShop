import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateAddressForm from "./CreateAddressForm";

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
