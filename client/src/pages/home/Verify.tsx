import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import Confetti from "react-confetti";

import { useSearchParams } from "react-router-dom";

import Spinner from "@/ui/Spinner.js";

import { useShopingCart } from "@/context/ShopingCartContext.js";

import axiosInstance from "@/services/axiosInstance.js";

import { formatToman } from "@/utils/helper.js";

function Verify() {
  const { onClearCart } = useShopingCart();
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [searchParams] = useSearchParams();

  const authority = searchParams.get("Authority") || "";
  const status = searchParams.get("Status") || "";
  const paymentId = searchParams.get("paymentId") || "";

  useEffect(() => {
    async function sendData() {
      setIsLoading(true);
      try {
        const { data } = await axiosInstance.get(
          `/payments/verify?authority=${authority}&status=${status}&paymentId=${paymentId}`,
        );
        setOrderData(data.order);
        setPaymentStatus(data.paymentStatus);
        onClearCart();
      } catch (error) {
        toast.error(error.response?.data?.message || "خطا در بررسی پرداخت");
      } finally {
        setIsLoading(false);
      }
    }
    sendData();
  }, [authority, status, paymentId]);

  if (isLoading) return <Spinner />;

  if (!orderData)
    return (
      <div className="mt-20 text-center text-lg">هیچ داده‌ای موجود نیست</div>
    );

  const {
    orderItems,
    totalAmount,
    status: orderStatus,
    address,
    _id,
  } = orderData;

  return (
    <div className="bg-grey-0 border-grey-100 mx-auto mt-10 w-full max-w-4xl rounded-xl border p-6 shadow-sm">
      {paymentStatus === "success" && (
        <Confetti
          numberOfPieces={500}
          recycle={false}
          className="absolute h-full w-full"
        />
      )}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-500 font-bold">جزئیات سفارش #{_id.slice(0, 8)}</h1>
        <span
          className={`text-200 rounded-full px-3 py-1 font-medium ${
            paymentStatus === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {paymentStatus === "success" ? "پرداخت موفق" : "پرداخت ناموفق"}
        </span>
      </div>

      <div className="text-300 space-y-2">
        <div className="space-x-2 font-medium">
          <span> وضعیت سفارش:</span>
          <span className="bg-primary/10 text-100 text-primary rounded-md px-2 py-1">
            {orderStatus === "processing" && "در حال پردازش"}
          </span>
        </div>
        <div>
          <span className="font-medium"> جمع کل: </span>
          <span>{totalAmount.toLocaleString()} تومان</span>
        </div>

        <div className="flex items-center gap-2">
          <p className="font-medium">آدرس تحویل : </p>
          <p>
            {address.addressLine} {address.city}
          </p>
        </div>

        <div className="mb-6">
          <span className="font-medium">کدپستی:</span>
          <span>{address.postalCode}</span>
        </div>
      </div>
      <div>
        <h2 className="text-300 mb-2 font-medium">محصولات سفارش</h2>
        <div className="space-y-4">
          {orderItems.map((item) => (
            <div
              key={item._id}
              className="border-grey-200 flex items-center justify-between rounded-lg border px-4 py-2"
            >
              <div className="flex gap-2">
                <img
                  src={item.product.imageCover}
                  alt={item.product.name}
                  className="h-20 w-20 rounded object-cover"
                />
                <div className="space-y-0.5">
                  <p className="font-semibold">{item.product.name}</p>
                  <div className="flex items-center gap-1">
                    <p className="text-100 text-grey-700">
                      {item.product.category.label},
                    </p>
                    <p className="text-100 text-grey-700">
                      {item.product.brand.label}
                    </p>
                  </div>
                  <p className="text-100 text-grey-700 flex items-center gap-1">
                    <span>رنگ :</span>
                    <span
                      className="h-4 w-4 rounded-md border border-gray-300"
                      style={{ backgroundColor: item.color.hex }}
                    />
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-200 font-semibold">
                  {formatToman(totalAmount)}
                </p>
                <p className="text-100 text-grey-700">تعداد: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Verify;
