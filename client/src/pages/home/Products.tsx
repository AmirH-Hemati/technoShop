import ProductFilter from "@/features/products/ProductFilters.js";
import ProductsList from "@/features/products/ProductsList.js";
import SummaryFilterComponents from "@/features/products/SummaryFilterComponents.js";
import { useProducts } from "@/features/products/useProducts.js";
import CategoriesIcon from "@/ui/CategoriesIcon.js";
import MobileFilter from "@/ui/MobileFilter.js";
import Row from "@/ui/Row.js";
import SortSelect from "@/ui/SortSelect.js";
import { formatPrice } from "@/utils/helper.js";

function Products() {
  const { products, isLoading } = useProducts();
  return (
    <div className="mt-6 space-y-6">
      <CategoriesIcon />

      {/* <FilterTest /> */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-[1fr_3fr]">
        <div className="grid gap-4">
          <SummaryFilterComponents />
          <ProductFilter />
          <MobileFilter />
        </div>

        <Row>
          <Row type="horizontal">
            <SortSelect />
            {!isLoading && (
              <p className="text-300 text-grey-600 hidden md:block">
                نتایج : {formatPrice(products.length)}
              </p>
            )}
          </Row>
          <ProductsList />
        </Row>
      </div>
    </div>
  );
}

export default Products;
