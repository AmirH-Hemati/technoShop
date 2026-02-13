import { DocumentText1 } from "iconsax-reactjs";
import Spinner from "../../ui/Spinner";
import OrderItem from "./OrderItem";
import { useMyOrders } from "./useMyOrders";
import DataStateHandler from "../../ui/DataStateHandler";

function OrderList() {
  const { orders, isLoading, error, refetch } = useMyOrders();

  return (
    <DataStateHandler
      isLoading={isLoading}
      data={orders}
      error={error}
      onRetry={refetch}
    >
      <ul className="border-grey-300 bg-grey-0 shadow-2 mt-4 h-[400px] overflow-y-auto rounded-xl border p-4">
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
