import { SwiperSlide } from "swiper/react";

import DataStateHandler from "@/ui/DataStateHandler.js";
import SwiperSlider from "@/ui/SwiperSlider.js";

import { useGetProductReviews } from "../hooks/useGetProductReviews.js";
import Review from "./Review.js";

function Reviews({ item }) {
  const { reviews, isLoading } = useGetProductReviews(item._id);

  return (
    <div className="flex flex-col gap-3 py-5">
      <DataStateHandler
        data={reviews}
        isLoading={isLoading}
        emptyMessage="خریداران این محصول هنوز نظری برای این محصول ثبت نکرده اند "
      >
        <ul className="hidden space-y-4 p-3 md:block">
          {reviews.map((comment) => (
            <Review review={comment} />
          ))}
        </ul>

        <div className="md:hidden">
          <SwiperSlider
            data={reviews}
            render={(comment) => (
              <SwiperSlide>
                <Review review={comment} />
              </SwiperSlide>
            )}
          />
        </div>
      </DataStateHandler>
    </div>
  );
}

export default Reviews;
