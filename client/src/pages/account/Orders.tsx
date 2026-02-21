import OrderTabs from "../../features/orders/OrderTabs";
import OrderList from "../../features/orders/OrderList";
import Heading from "@/ui/Heading.js";

function Orders() {
  return (
    <div className="mb-20 space-y-5 md:mb-0">
      <div className="space-y-1">
        <Heading type="h2">تاریخچه سفارشات</Heading>
      </div>
      <div className="border rounded-md py-2">
        <OrderTabs />
        <OrderList />
      </div>
    </div>
  );
}

export default Orders;
