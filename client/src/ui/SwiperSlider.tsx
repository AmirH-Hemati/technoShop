import { ArrowLeft2 } from "iconsax-reactjs";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";

function SwiperSlider({ render, data, bg }) {
  const swiperRef = useRef(null);

  return (
    <Swiper
      navigation={true}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      modules={[Pagination, Navigation]}
      className={`${bg ? "bg-primary rounded-md" : "bg-grey-50"} w-full`}
      breakpoints={{
        0: {
          slidesPerView: 1.6,
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
