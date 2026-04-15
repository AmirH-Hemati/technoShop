import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance  from "../../services/axiosInstance";
import { toast } from "react-toastify";
import Spinner from "../../ui/Spinner";
import Confetti from "react-confetti";
function Verify() {
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
    <div className="bg-grey-0 shadow-2 mx-auto mt-10 w-full max-w-4xl overflow-hidden rounded-xl p-6">
      {paymentStatus === "success" && (
        <Confetti numberOfPieces={500} recycle={false} />
      )}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">جزئیات سفارش #{_id.slice(0, 8)}</h1>
        <span
          className={`rounded-full px-4 py-2 font-semibold ${
            paymentStatus === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {paymentStatus === "success" ? "پرداخت موفق" : "پرداخت ناموفق"}
        </span>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">اطلاعات سفارش</h2>
        <p>وضعیت سفارش: {orderStatus}</p>
        <p>جمع کل: {totalAmount.toLocaleString()} تومان</p>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">آدرس تحویل</h2>
        <p>
          {address.addressLine}, {address.city}
        </p>
        <p>کدپستی: {address.postalCode}</p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold">محصولات سفارش</h2>
        <div className="space-y-4">
          {orderItems.map((item) => (
            <div
              key={item._id}
              className="shadow-2 border-grey-300 flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.imageCover}
                  alt={item.product.name}
                  className="h-20 w-20 rounded object-cover"
                />
                <div>
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.product.category.label}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {(
                    (item.product.price - item.product.priceDiscount) *
                    item.quantity
                  ).toLocaleString()}
                  تومان
                </p>
                <p className="text-sm text-gray-500">تعداد: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Verify;
