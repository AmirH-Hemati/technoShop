import { useSearchParams } from "react-router-dom";

function Filter({ filterField, options, direction = "horizontal" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || "";
  const isVertical = direction === "vertical";

  function handleSelect(value) {
    if (value === currentFilter) {
      searchParams.delete(filterField);
    } else {
      searchParams.set(filterField, value);
    }
    setSearchParams(searchParams);
  }

  return (
    <div
      className={`bg-white px-2 py-1 ${
        isVertical ? "flex flex-col gap-6" : "flex flex-wrap gap-2"
      }`}
    >
      {options.map((option) => {
        const active = option.value === currentFilter;
        if (isVertical) {
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center justify-between gap-3 p-3 text-base transition-all duration-150 hover:bg-gray-50 ${
                active ? "text-primary font-semibold" : "text-grey-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => handleSelect(option.value)}
                  className="accent-primary focus:ring-primary h-4 w-4 cursor-pointer focus:ring-2 focus:ring-offset-2"
                />
                <span>{option.label}</span>
              </div>
              <span className="text-xs text-gray-700">{option.value}</span>
            </label>
          );
        }

        return (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
              active
                ? "bg-primary border-primary text-white shadow-sm"
                : "bg-grey-50 border-grey-200 hover:bg-grey-100"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default Filter;
