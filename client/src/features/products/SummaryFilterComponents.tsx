import { type ReactElement } from "react";

import { CloseSquare } from "iconsax-reactjs";
import useProductFilter from "../../hooks/useFiltersProducts.js";
import { useMemo } from "react";

function SummaryFilterComponents(): ReactElement | null {
  const { filters, setFilters } = useProductFilter();
  function handleDeleteFilter(type, value) {
    console.log(type, value);
    setFilters({ [type]: filters[type].filter((filter) => filter !== value) });
  }

  const isEmpty: boolean = useMemo(() => {
    return (
      filters.brands.length == 0 &&
      filters.colors.length == 0 &&
      filters.categories.length == 0
    );
  }, [filters]);

  if (isEmpty) {
    return null;
  }
  return (
    <div className="bg-grey-0 h-fit space-y-4 rounded-xl py-4 shadow-sm">
      <div className="text-grey-700 border-grey-200 flex items-center justify-between border-b px-4 pb-3">
        <h3 className="text-300 font-semibold">فیلتر های انتخاب شده</h3>
        <button className="text-grey-0 text-100 cursor-pointer rounded-md bg-red-500 px-1 py-0.5">
          حذف همه
        </button>
      </div>

      <ul className="flex flex-wrap gap-2 px-4">
        {filters.brands.length !== 0 &&
          filters.brands &&
          filters.brands.map((filter) => (
            <li
              key={filter}
              className="bg-primary text-grey-0 text-100 flex cursor-pointer items-center gap-1 rounded-md px-3 py-0.5 font-medium"
              onClick={() => handleDeleteFilter("brands", filter)}
            >
              <span>برند :</span>
              <span className="leading-0">{filter}</span>
              <CloseSquare className="text-grey-300" size={18} />
            </li>
          ))}
        {filters.colors.length !== 0 &&
          filters.colors &&
          filters.colors.map((filter) => (
            <li
              key={filter}
              className="bg-primary text-grey-0 text-100 flex cursor-pointer items-center gap-1 rounded-md px-3 py-0.5 font-medium"
              onClick={() => handleDeleteFilter("colors", filter)}
            >
              <span>رنگ :</span> <span className="leading-0">{filter}</span>
              <CloseSquare className="text-grey-300" size={18} />
            </li>
          ))}
        {filters.categories.length !== 0 &&
          filters.categories &&
          filters.categories.map((filter) => (
            <li
              key={filter}
              className="bg-primary text-grey-0 text-100 flex cursor-pointer items-center gap-1 rounded-md px-3 py-0.5 font-medium"
              onClick={() => handleDeleteFilter("categories", filter)}
            >
              <span>دسته بندی :</span>{" "}
              <span className="leading-0">{filter}</span>
              <CloseSquare className="text-grey-300" size={18} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SummaryFilterComponents;
