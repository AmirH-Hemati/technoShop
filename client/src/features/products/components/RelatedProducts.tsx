import { SwiperSlide } from "swiper/react";
import SwiperSlider from "../../../ui/SwiperSlider.js";
import Product from "./Product.js";

import Heading from "../../../ui/Heading.js";
import type { ProductType } from "../types/product.js";
import { useRelatedProducts } from "../hooks/useRelatedProducts.js";
import DataStateHandler from "@/ui/DataStateHandler.js";

type Props = { product: ProductType };
function RelatedProducts({ product }: Props) {
  const { products, isLoading, error } = useRelatedProducts(
    product.category.value,
  );
  return (
    <div className="border-primary space-y-4 border-t py-5">
      <Heading type="h3">کالای های مشابه</Heading>
      <DataStateHandler<ProductType> data={products} isLoading={isLoading}>
        <SwiperSlider<ProductType>
          data={products}
          render={(product: ProductType) => (
            <SwiperSlide key={product._id} className="">
              <Product product={product} />
            </SwiperSlide>
          )}
        />
      </DataStateHandler>
    </div>
  );
}

export default RelatedProducts;
