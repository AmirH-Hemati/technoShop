import { SwiperSlide } from "swiper/react";
import Spinner from "../../ui/Spinner";
import SwiperSlider from "../../ui/SwiperSlider";
import { useLatestProducts } from "./useLatestProducts";
import Product from "./Product";
import Button from "../../ui/Button";
import { ArrowLeft2 } from "iconsax-reactjs";
import Timer from "../../ui/Timer";
import { motion } from "motion/react";

function AmazingPriceProducts() {
  const { products, isLoading } = useLatestProducts();
  if (isLoading) return <Spinner />;

  return (
    <motion.section
      initial={{ opacity: 0.5, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeIn" }}
      viewport={{ once: true }}
    >
      <SwiperSlider
        bg
        data={products}
        render={(product, index) => (
          <SwiperSlide key={product._id} className="py-4">
            {index === 0 ? (
              <div className="bg-primary mt-6 flex h-full flex-col justify-between gap-5 rounded-xl p-6 text-white">
                <p className="text-3xl leading-normal font-normal">
                  تخفیف‌های شگفت‌انگیز
                </p>
                <Timer />
                <Button
                  size="small"
                  variation="secondary"
                  className="flex items-center gap-2"
                >
                  مشاهده همه
                  <ArrowLeft2 size="16" />
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.3 }}
                viewport={{ once: true }}
              >
                <Product product={product} index={index} />
              </motion.div>
            )}
          </SwiperSlide>
        )}
      />
    </motion.section>
  );
}

export default AmazingPriceProducts;
