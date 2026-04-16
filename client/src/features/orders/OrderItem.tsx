import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, CalendarCheck, CpuIcon, Truck } from "lucide-react";

import { Button } from "@/components/ui/button.js";
import { formatToman } from "@/utils/helper.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.js";

import AddReview from "../reviews/AddReview.js";

function OrderItem({ order }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "processing";

  function handlecloseDialog() {
    setOpenDialog(false);
  }

  return (
    <li className="border-grey-100 my-3 rounded-md border bg-white shadow-xs">
      <div className="flex items-center justify-between p-1 md:px-4 md:py-3">
        <div className="text-200 text-grey-900 flex flex-row-reverse items-center gap-2 leading-none font-medium">
          {status === "processing" && (
            <div className="bg-grey-100 text-grey-900 flex items-center gap-2 rounded-md px-2 py-1">
              <CpuIcon size={19} />
              <span>آماده سازی سفارش</span>
            </div>
          )}
          {status === "delivered" && (
            <div className="flex items-center gap-2 rounded-md bg-green-100 px-2 py-1 text-green-900">
              <CalendarCheck className="text-green-600" size={19} />
              <span>تحویل داده شده</span>
            </div>
          )}
          {status === "shipped" && (
            <div className="flex items-center gap-2 rounded-md bg-orange-100 px-2 py-1 text-orange-900">
              <Truck className="text-red-600" size={19} />
              <span>ارسال شده</span>
            </div>
          )}
        </div>

        <div className="text-grey-600 text-100 flex items-center gap-0.5 md:gap-2">
          <span>#{order._id.slice(0, 6)}</span>
          <ArrowLeft size={14} />
        </div>
      </div>

      <div className="text-100 flex flex-col gap-2 border-b-2 border-dashed px-1 pb-1 md:flex-row md:items-center md:gap-6 md:px-4 md:pb-3">
        <p>
          <span className="text-grey-600">تاریخ سفارش : </span>
          <span className="text-grey-900">
            {new Date(order.createdAt).toLocaleDateString("fa-IR")}
          </span>
        </p>

        <p>
          <span className="text-grey-600">کد سفارش : </span>
          <span className="text-grey-900">{order._id.slice(0, 6)}</span>
        </p>

        <p>
          <span className="text-grey-600">مبلغ : </span>
          <span className="text-grey-900">
            {formatToman(order.totalAmount)}
          </span>
        </p>
      </div>

      <ul className="divide-y">
        {order.orderItems.map((productItem) => (
          <li
            key={productItem._id}
            className="flex flex-col gap-3 p-1 md:flex-row md:items-center md:justify-between md:px-4 md:py-3"
          >
            <div className="flex items-center gap-3">
              <img
                className="h-12 w-12 rounded-md object-cover"
                src={productItem.product.imageCover}
                alt={productItem.product.name}
              />

              <div className="text-grey-600 text-200 flex flex-col gap-1">
                <p className="text-grey-900 text-300 line-clamp-2 font-semibold">
                  {productItem.product.name}
                </p>
                <p>قیمت: {formatToman(productItem.product.price)}</p>
                <p>تعداد: {productItem.quantity}</p>
              </div>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger>
                <Button variant="ghost" size="xs">
                  ثبت نظر خریدارن
                </Button>
              </DialogTrigger>
              <DialogContent
                showCloseButton={false}
                className="sm:!max-w-1xl !w-full overflow-auto sm:!max-h-[85vh]"
                style={{ scrollbarWidth: "thin" }}
              >
                <AddReview
                  item={productItem.product}
                  onCloseDialog={handlecloseDialog}
                />
              </DialogContent>
            </Dialog>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default OrderItem;
