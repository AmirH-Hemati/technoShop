import { SwiperSlide } from "swiper/react";
import Row from "../../ui/Row";
import SwiperSlider from "../../ui/SwiperSlider";
import Product from "../products/Product";
import { useMyOrders } from "./useMyOrders";
import DataStateHandler from "../../ui/DataStateHandler";

function PreviousOrder() {
  const { orders, isLoading, error, refetch } = useMyOrders();

  const allProducts = orders
    ?.flatMap((order) => order.orderItems)
    ?.map((product) => product.product);

  const existProducts = allProducts?.reduce((acc, currentProduct) => {
    if (!acc?.map((item) => item._id)?.includes(currentProduct._id)) {
      return [...acc, currentProduct];
    } else {
      return acc;
    }
  }, []);

  return (
    <DataStateHandler
      isLoading={isLoading}
      data={existProducts}
      error={error}
      onRetry={refetch}
    >
      <div className="mt-10 space-y-5">
        <Row type="horizontal">
          <p className="text-primary text-lg leading-normal font-bold">
            خریدهای پرتکرار شما
          </p>
        </Row>

        <SwiperSlider
          data={existProducts}
          render={(product) => (
            <SwiperSlide key={product._id} className="py-5">
              <Product product={product} />
            </SwiperSlide>
          )}
        />
      </div>
    </DataStateHandler>
  );
}

export default PreviousOrder;
