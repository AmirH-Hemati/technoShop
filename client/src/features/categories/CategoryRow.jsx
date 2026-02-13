import { Edit, Trash } from "iconsax-reactjs";
import { BASE_URL } from "../../services/axiosInstance";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import CreateCategoryForm from "./CreateCategoryForm";

function CategoryRow({ category }) {
  const { image, label, createdAt, updatedAt } = category;
  return (
    <Table.Row>
      <img
        src={`${BASE_URL}img/categories/${image}`}
        alt={label}
        className="aspect-square w-full object-cover object-center"
      />
      <p className="bg-primary w-fit rounded-full px-6 py-2 text-sm font-semibold text-white">
        {label}
      </p>
      <div>{new Date().toLocaleDateString("fa-IR")}</div>
      <div>{new Date(updatedAt).toLocaleString("fa-IR")}</div>
      <div>{12}</div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={category._id} />

            <Menus.List id={category._id}>
              <Menus.Button icon={<Trash />}>حذف</Menus.Button>
              <Modal.Open open="editCategory">
                <Menus.Button icon={<Edit />}>اپدیت</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="editCategory">
              <CreateCategoryForm category={category} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CategoryRow;
