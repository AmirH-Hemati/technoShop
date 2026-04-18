import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";

type Props<T> = {
  data: T[];
  render: (item: T, index: number) => React.ReactNode;
  bg?: boolean;
};
function SwiperSlider<T>({ render, data, bg }: Props<T>) {
  return (
    <Swiper
      navigation={true}
      modules={[Pagination, Navigation]}
      className={`${bg ? "bg-primary rounded-md" : ""} w-full`}
      breakpoints={{
        0: {
          slidesPerView: 1.3,
          spaceBetween: 16,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 3.2,
          spaceBetween: 26,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 28,
        },
      }}
    >
      {data?.map(render)}
    </Swiper>
  );
}

export default SwiperSlider;
