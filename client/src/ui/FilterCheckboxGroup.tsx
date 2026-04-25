import type { ReactElement } from "react";

import useProductFilter from "@/hooks/useFiltersProducts.js";

import type { FilterType } from "@/types/filter.type.js";
import type { SelectOptionType } from "@/types/select-option-types.js";

type Props = {
  options: SelectOptionType[];
  type: keyof Omit<FilterType, "minPrice" | "maxPrice">;
};

function FilterCheckboxGroup({ options, type }: Props): ReactElement {
  const { filters, setFilters } = useProductFilter();

  const activeFilters = filters[type];

  function handelSelectFilter(value: string) {
    if (activeFilters.includes(value)) {
      setFilters({ [type]: activeFilters.filter((o) => o !== value) });
    } else {
      setFilters({ [type]: [...activeFilters, value] });
    }
  }
  return (
    <ul
      className="bg-grey-0 thin max-h-60 overflow-auto"
      style={{ scrollbarWidth: "thin" }}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={`hover:bg-grey-50 flex cursor-pointer items-center justify-between gap-3 px-1 py-3 text-base transition-all duration-150 select-none`}
        >
          <div className="flex items-center gap-2">
            <input
              checked={activeFilters.includes(option.value)}
              value={option.value}
              onChange={(e) => handelSelectFilter(e.target.value)}
              type="checkbox"
              className="accent-primary h-3.5 w-3.5 cursor-pointer"
            />
            <span className="text-grey-900 text-200 font-medium">
              {option.label}
            </span>
          </div>
          <span className="text-grey-600 text-100">{option.value}</span>
        </label>
      ))}
    </ul>
  );
}

export default FilterCheckboxGroup;
