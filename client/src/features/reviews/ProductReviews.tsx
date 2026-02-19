import { SwiperSlide } from "swiper/react";
import SwiperSlider from "../../ui/SwiperSlider.js";
import Review from "./Review.js";
import Spinner from "../../ui/Spinner.js";
import { Verify } from "iconsax-reactjs";
import type { ProductType } from "../products/types/product.js";
import { useGetProductReviews } from "./useGetProductReviews.js";

function ProductReviews({ product }: { product: ProductType }) {
  const { reviews, isLoading } = useGetProductReviews(product._id);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col gap-6 py-6">
      {(!reviews || reviews.length === 0) && (
        <div className="rounded-md bg-gray-50 p-6 text-center text-gray-500">
          هنوز هیچ خریدار نظری ثبت نکرده است.
        </div>
      )}

      {reviews && reviews.length > 0 && (
        <ul className="hidden flex-col gap-3 p-3 md:flex">
          {reviews.map((review) => (
            <li
              key={review._id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2">
                <Verify size={18} className="text-green-600" />
                <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs text-green-600">
                  خریدار محصول
                </span>
              </div>

              <Review review={review} />
            </li>
          ))}
        </ul>
      )}

      <div className="md:hidden">
        <SwiperSlider
          data={reviews}
          render={(review) => (
            <SwiperSlide>
              <div className="rounded-xl border bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <Verify size={18} className="text-green-600" />
                  <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs text-green-600">
                    خریدار محصول
                  </span>
                </div>

                <Review review={review} />
              </div>
            </SwiperSlide>
          )}
        />
      </div>
    </div>
  );
}

export default ProductReviews;
