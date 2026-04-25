import { DocumentText1 } from "iconsax-reactjs";

import DataStateHandler from "../../../ui/DataStateHandler.js";
import { useMyOrders } from "../hooks/useMyOrders.js";
import OrderItem from "./OrderItem.js";

function OrderList() {
  const { orders, isLoading, error, refetch } = useMyOrders();

  return (
    <DataStateHandler
      isLoading={isLoading}
      data={orders}
      error={error}
      onRetry={refetch}
      emptyMessage="تاریخپه ای از اطلاعات سفارش وجود ندارد."
    >
      <ul className="bg-grey-0 px-2">
        {orders.length === 0 && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <DocumentText1 size="50" />
            <p className="text-lg font-medium">هنوز هیچ سفارشی ندادید</p>
          </div>
        )}
        {orders.map((order) => (
          <OrderItem key={order._id} order={order} />
        ))}
      </ul>
    </DataStateHandler>
  );
}

export default OrderList;
