import { Edit, Trash } from "iconsax-reactjs";
import { BASE_URL } from "../../services/axiosInstance";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { formatDate, formatToman } from "../../utils/helper";
import CreateProductForm from "./CreateProductForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteProduct } from "./useDeleteProduct";

function ProductRow({ product }) {
  const {
    _id: id,
    name,
    price,
    priceDiscount,
    imageCover,
    createdAt,
    updatedAt,
    category: { label },
  } = product;
  const { deleteProduct, isDeleting } = useDeleteProduct();
  return (
    <Table.Row>
      <img
        src={product.imageCover}
        alt={name}
        className="aspect-[3/2] w-full object-cover object-center"
      />
      <div className="text-grey-600 text-sm font-semibold">{name}</div>
      <div className="flex flex-col gap-1 font-semibold">
        <span className="text-sm">
          قیمت نهایی &larr; {formatToman(price - priceDiscount)}
        </span>
        <span className="text-grey-600 text-xs">
          <span className="line-through">قیمت اصلی : {formatToman(price)}</span>
        </span>
      </div>

      <div className="text-sm font-medium">{formatToman(priceDiscount)}</div>
      <div className="flex flex-col gap-1 font-semibold">
        <span className="text-sm">
          زمان ایجاد &larr; {formatDate(createdAt)}{" "}
        </span>
        <span className="text-grey-600 text-xs">
          اخرین اپدیت &larr; {formatDate(updatedAt)}
        </span>
      </div>
      <div className="bg-tint-1 text-tint-5 w-fit rounded-full px-3 py-1.5 text-xs font-semibold uppercase">
        {label}
      </div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Modal.Open open="deleteProduct">
                <Menus.Button icon={<Trash />}>حذف</Menus.Button>
              </Modal.Open>
              <Modal.Open open="editProduct">
                <Menus.Button icon={<Edit />}>اپدیت</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="editProduct">
              <CreateProductForm product={product} />
            </Modal.Window>
            <Modal.Window name="deleteProduct">
              <ConfirmDelete
                resourceName="محصول"
                disabled={isDeleting}
                onConfirm={() => deleteProduct(id)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default ProductRow;
