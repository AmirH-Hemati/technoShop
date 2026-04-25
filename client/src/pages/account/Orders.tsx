import Heading from "@/ui/Heading.js";
import OrderList from "@/features/orders/components/OrderList.js";
import OrderTabs from "@/features/orders/components/OrderTabs.js";
import BackButton from "@/ui/BackButton.js";

function Orders() {
  return (
    <div className="mb-20 space-y-5 md:mb-0">
      <div className="flex items-center gap-2">
        <BackButton />
        <Heading type="h2">تاریخچه سفارشات</Heading>
      </div>

      <div className="rounded-md border py-2">
        <OrderTabs />
        <OrderList />
      </div>
    </div>
  );
}

export default Orders;
