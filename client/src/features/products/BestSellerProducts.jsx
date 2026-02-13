import { ArrowLeft2 } from "iconsax-reactjs";
import Row from "../../ui/Row";
import { Link } from "react-router-dom";
import SwiperSlider from "../../ui/SwiperSlider";
import Product from "./Product";
import { SwiperSlide } from "swiper/react";
import { useLatestProducts } from "./useLatestProducts";
import { motion } from "motion/react";
import DataStateHandler from "../../ui/DataStateHandler";
function BestSellerProducts() {
  const { products, isLoading, error, refetch } = useLatestProducts();
  return (
    <DataStateHandler
      isLoading={isLoading}
      data={products}
      error={error}
      onRetry={refetch}
    >
      <motion.div
        initial={{ opacity: 0.5, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeIn" }}
        viewport={{ once: true }}
        className="space-y-4"
      >
          <Row type="horizontal">
          <p className="text-primary leading-[140%] font-medium text-500">
          پرفروش ترین محصولات
          </p>
          <Link className="text-primary flex items-center gap-1 text-300 leading-[140%] font-medium ">
            <span>مشاهده همه </span>
            <ArrowLeft2 size={20} />
          </Link>
        </Row>
        

        <SwiperSlider
          data={products}
          render={(product, index) => (
            <SwiperSlide key={product._id} className="py-5">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.3 }}
                viewport={{ once: true }}
              >
                <Product product={product} />
              </motion.div>
            </SwiperSlide>
          )}
        />
      </motion.div>
    </DataStateHandler>
  );
}

export default BestSellerProducts;
