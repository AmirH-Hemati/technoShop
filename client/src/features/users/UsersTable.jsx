import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import UsersRow from "./UsersRow";
import { useUsers } from "./useUsers";

function UsersTable() {
  const { users, isLoading } = useUsers();
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.4fr 1fr 1.2fr 2fr 0.6fr 0.4fr">
        <Table.Header>
          <div></div>
          <div>نام و نام خانوادگی</div>
          <div>شماره موبایل</div>
          <div>ایمیل</div>
          <div>نقش کاربر</div>
          <div></div>
        </Table.Header>
        <Table.Body data={users} render={(user) => <UsersRow user={user} />} />
      </Table>
    </Menus>
  );
}

export default UsersTable;
