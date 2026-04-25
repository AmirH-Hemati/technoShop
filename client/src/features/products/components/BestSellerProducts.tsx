import { ArrowLeft2 } from "iconsax-reactjs";

import { motion } from "motion/react";

import { SwiperSlide } from "swiper/react";

import { Link } from "react-router-dom";

import DataStateHandler from "@/ui/DataStateHandler.js";
import Row from "@/ui/Row.js";

import SwiperSlider from "../../../ui/SwiperSlider.js";
import { useLatestProducts } from "../hooks/useLatestProducts.js";
import type { ProductType } from "../types/product.js";
import Product from "./Product.js";

function BestSellerProducts() {
  const { products, isLoading, error, refetch } = useLatestProducts();

  const renderProduct = (product: ProductType, index: number) => (
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
  );
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
          <p className="text-primary text-500 leading-[140%] font-medium">
            پرفروش ترین محصولات
          </p>
          <Link
            to="/products"
            className="text-primary text-300 flex items-center gap-1 leading-[140%] font-medium"
          >
            <span>مشاهده همه </span>
            <ArrowLeft2 size={20} />
          </Link>
        </Row>

        <SwiperSlider data={products} render={renderProduct} />
      </motion.div>
    </DataStateHandler>
  );
}

export default BestSellerProducts;
