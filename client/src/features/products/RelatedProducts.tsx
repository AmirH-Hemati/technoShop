import { SwiperSlide } from "swiper/react";
import SwiperSlider from "../../ui/SwiperSlider.js";
import Product from "./Product.jsx";
import { useRelatedProducts } from "./useRelatedProducts.js";

import Heading from "../../ui/Heading.js";
import Spinner from "../../ui/Spinner.js";

function RelatedProducts({ product }) {
  const { products, isLoading } = useRelatedProducts(product.category.value);

  if (isLoading) return <Spinner />;

  return (
    <div className="border-primary space-y-4 border-t py-5">
      <Heading type="h3">کالای های مشابه</Heading>
      <SwiperSlider
        data={products}
        render={(product) => (
          <SwiperSlide key={product._id} className="">
            <Product product={product} />
          </SwiperSlide>
        )}
      />
    </div>
  );
}

export default RelatedProducts;
