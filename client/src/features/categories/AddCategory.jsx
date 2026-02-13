import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCategoryForm from "./CreateCategoryForm";

function AddCategory() {
  return (
    <>
      <Modal>
        <Modal.Open open="addCategory">
          <Button>اضافه کردن دسته بندی</Button>
        </Modal.Open>

        <Modal.Window name="addCategory">
          <CreateCategoryForm />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default AddCategory;
