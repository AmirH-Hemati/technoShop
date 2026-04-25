import { ArrowLeft } from "iconsax-reactjs";

import { Link } from "react-router-dom";

const statuses = [
  { title: "جاری", img: "/status-processing.svg", key: "shipped" },
  { title: "تحویل شده", img: "/status-delivered.svg", key: "delivered" },
  { title: "لغو شده", img: "/status-returned.svg", key: "processing" },
];
function OrderStatusSummary() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-400 w-fit border-b-2 border-red-500 py-1 font-medium">
          سفارش های من
        </h1>
        <Link
          to="/account/orders"
          className="text-100 flex items-center gap-1 text-blue-500"
        >
          مشاهده همه
          <ArrowLeft size={18} />
        </Link>
      </div>
      <div className="mt-4 flex flex-row gap-2">
        {statuses.map((status) => (
          <div
            key={status.title}
            className="bg-grey-0 flex flex-1 flex-col items-center justify-center rounded-xl py-4 shadow-md lg:flex-row"
          >
            <div className="relative">
              <img src={status.img} alt={status.title} />
              <span className="text-100 absolute bottom-0 left-1 rounded-md bg-gray-300 px-2 py-1 font-semibold lg:hidden">
                0
              </span>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-300 font-medium text-gray-800">
                {status.title}
              </p>

              <span className="text-100 text-grey-700 hidden px-2 py-1 font-semibold lg:block">
                {0} سفارش
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderStatusSummary;
