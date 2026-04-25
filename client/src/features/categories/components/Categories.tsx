import DataStateHandler from "@/ui/DataStateHandler.js";

import { motion } from "motion/react";

import Category from "./Category.js";
import { useCategories } from "../hooks/useCategories.js";

function Categories() {
  const { categories, isLoading, error, refetch } = useCategories();
  return (
    <DataStateHandler
      isLoading={isLoading}
      data={categories}
      error={error}
      onRetry={refetch}
    >
      <ul className="flex justify-between gap-3 overflow-x-auto overflow-y-hidden pb-4">
        {categories?.map((category, index) => (
          <motion.div
            key={category._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.3 }}
            viewport={{ once: true }}
          >
            <Category category={category} />
          </motion.div>
        ))}
      </ul>
    </DataStateHandler>
  );
}

export default Categories;
