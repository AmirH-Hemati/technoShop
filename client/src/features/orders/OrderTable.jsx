import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import OrderRow from "./OrderRow";
import { useOrders } from "./useOrders";

function OrderTable() {
  const { orders, isLoading } = useOrders();
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.4fr 1.8fr 2.2fr 1.4fr 1.6fr 1.4fr 0.4fr">
        <Table.Header>
          <div>#</div>
          <div>کاربر</div>
          <div>آدرس</div>
          <div>جزئیات کالا</div>
          <div>وضعیت</div>
          <div>مبلغ کل</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={orders}
          render={(order, index) => (
            <OrderRow key={order._id} order={order} index={index + 1} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default OrderTable;
