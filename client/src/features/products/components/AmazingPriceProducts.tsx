import { SwiperSlide } from "swiper/react";
import { useLatestProducts } from "../hooks/useLatestProducts.js";
import Product from "./Product.js";
import Button from "../../../ui/Button.js";
import { ArrowLeft2 } from "iconsax-reactjs";
import { motion } from "motion/react";
import type { ProductType } from "../types/product.js";
import Timer from "@/ui/Timer.js";
import { Spinner } from "@/components/ui/spinner.js";
import SwiperSlider from "@/ui/SwiperSlider.js";

function AmazingPriceProducts() {
  const { products, isLoading } = useLatestProducts();
  console.log("render product");

  const renderProduct = (product: ProductType, index: number) => (
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
          <Product product={product} />
        </motion.div>
      )}
    </SwiperSlide>
  );
  if (isLoading) return <Spinner />;
  return (
    <motion.section
      initial={{ opacity: 0.5, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeIn" }}
      viewport={{ once: true }}
    >
      <SwiperSlider bg data={products} render={renderProduct} />
    </motion.section>
  );
}

export default AmazingPriceProducts;
