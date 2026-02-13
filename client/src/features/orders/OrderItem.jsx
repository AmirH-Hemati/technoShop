import { ArrowLeft, CloseSquare, Cpu, TickSquare } from "iconsax-reactjs";
import { formatToman } from "../../utils/helper";
import { BASE_URL } from "../../services/axiosInstance";
import { useSearchParams } from "react-router-dom";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import AddReview from "../reviews/AddReview";

function OrderItem({ order }) {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "processing";
  return (
    <li className="border-grey-200 cursor-pointer rounded-lg my-2 shadow-2 border py-2">
      <div className="flex items-center justify-between p-4">
        <div className="text-grey-900 text-md flex flex-row-reverse items-center gap-2 font-medium">
          {status === "processing" && (
            <div className="flex items-center gap-1">
              <Cpu size={22} />
              <span>آماده سازی سفارش</span>
            </div>
          )}
          {status === "delivered" && (
            <div className="flex items-center gap-1">
              <span>تحویل داده شده</span>
              <TickSquare variant="Bold" className="text-green-600" size={22} />
            </div>
          )}
          {status === "shipped" && (
            <div className="flex items-center gap-1">
              <span>ارسال شده </span>
              <CloseSquare variant="Bold" className="text-red-600" size={22} />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6 p-4">
        <p className="text-grey-600 text-xs lg:text-sm">
          {new Date(order.createdAt).toLocaleDateString("fa-IR")}
        </p>
        <p className="text-xs lg:text-sm">
          <span className="text-grey-500">کد سفارش : </span>
          <span className="text-grey-900 font-medium">125892</span>
        </p>

        <p className="text-xs lg:text-sm">
          <span className="text-grey-500">مبلغ : </span>
          <span className="text-grey-900 font-medium">
            {formatToman(order.totalAmount)}
          </span>
        </p>
      </div>

      <div className="border-grey-300 border" />

      <div className="flex flex-col gap-4 px-4 py-6">
        {order.orderItems.map((productItem) => (
          <div
            key={productItem._id}
            className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <img
                className="h-12 w-12 rounded-md object-cover object-center"
                src={`${BASE_URL}img/products/${productItem.product.imageCover}`}
                alt={productItem.product.name}
              />
              <div className="flex flex-col">
                <p className="line-clamp-2 text-xs font-semibold lg:text-sm">
                  {productItem.product.name}
                </p>
                <p className="text-xs text-gray-500">
                  قیمت: {formatToman(productItem.product.price)}
                </p>
                <p className="text-xs text-gray-500">
                  تعداد: {productItem.quantity}
                </p>
              </div>
            </div>
            <Modal>
              <Modal.Open open="addComment">
                <Button variation="secondary" size="small">
                  ثبت نظر خریدارن
                </Button>
              </Modal.Open>
              <Modal.Window name="addComment">
                <AddReview item={productItem.product} />
              </Modal.Window>
            </Modal>
          </div>
        ))}
      </div>
    </li>
  );
}

export default OrderItem;
