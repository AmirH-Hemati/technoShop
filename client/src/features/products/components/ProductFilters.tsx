import { Candle2 } from "iconsax-reactjs";

import { Spinner } from "@/components/ui/spinner.js";

import FilterCheckboxGroup from "@/ui/FilterCheckboxGroup.jsx";
import FilterSection from "@/ui/FilterSection.jsx";
import PriceRangeFilter from "@/ui/PriceRangeFilter.js";

import { useCategories } from "@/features/categories/hooks/useCategories.js";

import { brands } from "@/data/brands.js";
import { colors } from "@/data/colors.js";

function ProductFilter() {
  const { categories, isLoading } = useCategories();

  return (
    <div className="bg-grey-0 hidden h-fit space-y-4 rounded-xl py-4 shadow-sm md:block">
      <div className="text-grey-700 border-grey-200 flex items-center gap-2 border-b px-4 pb-2">
        <Candle2 size={20} />
        <h3 className="text-300 font-semibold">فیلترها </h3>
      </div>

      <FilterSection title="فیلتر بر اساس قیمت">
        <PriceRangeFilter />
      </FilterSection>

      <FilterSection title="دسته بندی ها">
        {isLoading ? (
          <Spinner />
        ) : (
          <FilterCheckboxGroup options={categories} type="categories" />
        )}
      </FilterSection>
      <FilterSection title="برند ها">
        <FilterCheckboxGroup options={brands} type="brands" />
      </FilterSection>
      <FilterSection title="رنگ ها">
        <FilterCheckboxGroup options={colors} type="colors" />
      </FilterSection>
    </div>
  );
}

export default ProductFilter;
