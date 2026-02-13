import { Eye } from "iconsax-reactjs";
import Table from "../../ui/Table";
import { formatDate, formatToman } from "../../utils/helper";
import Menus from "../../ui/Menus";

function OrderRow({ order, index, onSelect }) {
  const statusColors = {
    processing: "bg-blue-100 text-blue-600",
    shipped: "bg-orange-100 text-orange-600",
    delivered: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
  };

  const paymentColors = {
    pending: "bg-yellow-100 text-yellow-600",
    paid: "bg-green-100 text-green-600",
    failed: "bg-red-100 text-red-600",
  };

  return (
    <Table.Row className="text-sm transition-all duration-200 hover:bg-gray-50">
      <div className="flex items-center justify-center font-semibold text-gray-600">
        {index < 10 ? `0${index}` : index}
      </div>

      <div className="flex flex-col items-start gap-0.5">
        <span className="font-semibold text-gray-800">
          {order.user?.name || "کاربر ناشناس"}
        </span>
        <span className="text-xs text-gray-500">{order.user?.phone}</span>
      </div>

      <div className="flex max-w-[180px] flex-col gap-0.5">
        <span className="text-sm">شهر &larr; {order.address?.city}</span>
        <span className="text-grey-600 text-xs">
          <span>آدرس : {order.address?.addressLine}</span>
        </span>
      </div>

      <div className="flex flex-col gap-1 font-semibold">
        <span className="text-sm">
          تعداد اقلام&larr; {order.products?.length}
        </span>
        <span className="text-grey-600 text-xs">
          <span>زمان سفارش: {formatDate(order.createdAt)}</span>
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span
          className={`w-fit rounded-full px-2 py-1 text-xs ${
            paymentColors[order.paymentStatus] || "bg-gray-100 text-gray-500"
          }`}
        >
          {order.paymentStatus === "paid"
            ? "پرداخت شده"
            : order.paymentStatus === "pending"
              ? "در انتظار پرداخت"
              : "پرداخت ناموفق"}
        </span>

        <span
          className={`w-fit rounded-full px-2 py-1 text-xs ${
            statusColors[order.orderStatus] || "bg-gray-100 text-gray-500"
          }`}
        >
          {order.orderStatus === "processing"
            ? "در حال پردازش"
            : order.orderStatus === "shipped"
              ? "در حال ارسال"
              : order.orderStatus === "delivered"
                ? "تحویل داده شده"
                : "لغو شده"}
        </span>
      </div>

      <div className="font-bold text-gray-800">
        {formatToman(order.totalPrice)}
      </div>

      <div className="flex justify-center">
        <Menus.Menu>
          <Menus.Toggle />
        </Menus.Menu>
      </div>
    </Table.Row>
  );
}

export default OrderRow;
