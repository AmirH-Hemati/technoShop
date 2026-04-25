import DataStateHandler from "../../../ui/DataStateHandler.js";
import ProductItem from "./ProductItem.jsx";
import { useProducts } from "../hooks/useProducts.js";
import { motion } from "motion/react";
function ProductsList() {
  const { isLoading, products, error, refetch } = useProducts();
  return (
    <DataStateHandler
      isLoading={isLoading}
      data={products}
      error={error}
      onRetry={refetch}
    >
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products?.map((product, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <ProductItem product={product} key={product._id} />
          </motion.div>
        ))}
      </ul>
    </DataStateHandler>
  );
}

export default ProductsList;
