import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";

const parsers = {
  colors: parseAsArrayOf(parseAsString).withDefault([]),
  brands: parseAsArrayOf(parseAsString).withDefault([]),
  categories: parseAsArrayOf(parseAsString).withDefault([]),
  minPrice: parseAsInteger,
  maxPrice: parseAsInteger,
  sort: parseAsString,
};

export default function useProductFilter() {
  const [filters, setFilters] = useQueryStates(parsers, {
    shallow: true,
    history: "replace",
  });

  return {
    filters,
    setFilters,
  };
}
