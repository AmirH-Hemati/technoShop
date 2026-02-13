import DataStateHandler from "../../ui/DataStateHandler";
import Spinner from "../../ui/Spinner";
import Category from "./Category";
import { useCategories } from "./useCategories";
import { motion } from "motion/react";
function Categories() {
  const { categories, isLoading, error, refetch } = useCategories();
  return (
    <DataStateHandler
      isLoading={isLoading}
      data={categories}
      error={error}
      onRetry={refetch}
    >
      <motion.div
        initial={{ opacity: 0.5, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="overflow-x-auto overflow-y-hidden"
      >
        <ul className="flex justify-between gap-3 p-3">
          {categories?.map((category, index) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.3 }}
              viewport={{ once: true }}
              key={category._id}
            >
              <Category category={category} />
            </motion.div>
          ))}
        </ul>
      </motion.div>
    </DataStateHandler>
  );
}

export default Categories;
