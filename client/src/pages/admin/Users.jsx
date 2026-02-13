import UsersTable from "../../features/users/UsersTable";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

function Users() {
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">کاربران</Heading>
        <p>sort / filter</p>
      </Row>

      <Row>
        <UsersTable />
      </Row>
    </>
  );
}

export default Users;
