import OrderTabs from "../../features/orders/OrderTabs";
import OrderList from "../../features/orders/OrderList";
import BackButton from "../../ui/BackButton";

function Orders() {
  return (
    <div className="mb-20 space-y-5 md:mb-0">
      <BackButton />
      <OrderTabs />
      <OrderList />
    </div>
  );
}

export default Orders;
