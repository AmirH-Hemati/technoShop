import { SwiperSlide } from "swiper/react";

import { useGetProductReviews } from "./useGetProductReviews.js";

import Review from "./Review.js";
import SwiperSlider from "@/ui/SwiperSlider.js";
import DataStateHandler from "@/ui/DataStateHandler.js";

function Reviews({ item }) {
  const { reviews, isLoading } = useGetProductReviews(item._id);

  return (
    <div className="flex flex-col gap-3 py-5">
      <DataStateHandler data={reviews} isLoading={isLoading}>
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
