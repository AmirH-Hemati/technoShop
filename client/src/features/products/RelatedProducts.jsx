import { SwiperSlide } from "swiper/react";
import SwiperSlider from "../../ui/SwiperSlider";
import Product from "./Product";
import { useRelatedProducts } from "./useRelatedProducts";

import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";

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
