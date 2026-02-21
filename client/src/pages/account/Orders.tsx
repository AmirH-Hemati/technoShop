
import Heading from "@/ui/Heading.js";
import OrderList from "@/features/orders/OrderList.js";
import OrderTabs from "@/features/orders/OrderTabs.js";

function Orders() {
  return (
    <div className="mb-20 space-y-5 md:mb-0">
      <Heading type="h2">تاریخچه سفارشات</Heading>
      <div className="rounded-md border py-2">
        <OrderTabs />
        <OrderList />
      </div>
    </div>
  );
}

export default Orders;
