import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateProductForm from "./CreateProductForm";

function AddProduct() {
  return (
    <div className="mr-auto">
      <Modal>
        <Modal.Open open="addProduct">
          <Button size="large">اضافه کردن محصول</Button>
        </Modal.Open>

        <Modal.Window name="addProduct">
          <CreateProductForm />
        </Modal.Window>
        
      </Modal>
    </div>
  );
}

export default AddProduct;
