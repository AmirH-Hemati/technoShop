import OrderTable from "../../features/orders/OrderTable";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

function OrdersAdmin() {
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">سفارشات</Heading>
        <p>sort / filter</p>
      </Row>
      <Row>
        <OrderTable />
      </Row>
    </>
  );
}

export default OrdersAdmin;
