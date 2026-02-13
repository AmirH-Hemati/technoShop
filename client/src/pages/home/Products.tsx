import ProductFilter from "@/features/products/ProductFilters.js";
import ProductsList from "@/features/products/ProductsList.js";
import SummaryFilterComponents from "@/features/products/SummaryFilterComponents.js";
import CategoriesIcon from "@/ui/CategoriesIcon.js";
import Row from "@/ui/Row.js";

function Products() {
  return (
    <div className="mt-10 space-y-6">
      <CategoriesIcon />

      {/* <FilterTest /> */}
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[1fr_3fr]">
        <div className="grid gap-4">
          <SummaryFilterComponents />
          <ProductFilter />
        </div>

        <Row>
          {/* <SortBy
            disabledLabel="مرتب سازی"
            options={[
              { label: "  جدید ترین ", value: "popular" },
              { label: "جدید ترین ", value: "createdAt" },
              { label: "قدیمی ترین", value: "popular" },
              { label: "محبوب ترین", value: "populate" },
            ]}
          /> */}

          <ProductsList />
        </Row>
      </div>
    </div>
  );
}

export default Products;
