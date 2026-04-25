import { Edit, Trash } from "iconsax-reactjs";

import { BASE_URL } from "../../services/axiosInstance";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { useDeleteUser } from "./useDeleteUser";

function UsersRow({ user }) {
  const { _id: id, name, photo, email, role, phone } = user;
  const { deleteUser, isDeleting } = useDeleteUser();

  return (
    <Table.Row>
      <img
        src={`${BASE_URL}img/users/${photo}`}
        alt={name}
        className="w-full object-cover object-center"
      />
      <div className="text-grey-800 text-base font-semibold">{name}</div>
      <div className="text-grey-700 text-base font-semibold">{phone}</div>
      <div className="text-grey-500 text-sm font-semibold">{email}</div>

      <div className="bg-tint-1 text-tint-5 w-fit rounded-full px-3 py-1.5 text-xs font-semibold uppercase">
        {role}
      </div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Modal.Open open="deleteUser">
                <Menus.Button icon={<Trash />}>حذف</Menus.Button>
              </Modal.Open>
              <Modal.Open open="editUser">
                <Menus.Button icon={<Edit />}>ویرایش</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="editUser"></Modal.Window>
            <Modal.Window name="deleteUser">
              <ConfirmDelete
                resourceName="کاربر"
                disabled={isDeleting}
                onConfirm={() => deleteUser(id)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default UsersRow;
