import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.js";
import useProductFilter from "@/hooks/useFiltersProducts.js";
import { cn } from "@/lib/utils.js";
import type { SelectOptionType } from "@/types/select-option-types.js";

const options: SelectOptionType[] = [
  { value: "mostViewed", label: "پربازدیدترین" },
  { value: "newest", label: "جدیدترین" },
  { value: "oldest", label: "قدیمی‌ترین" },
  { value: "priceLowToHigh", label: "قیمت: کم به زیاد" },
  { value: "priceHighToLow", label: "قیمت: زیاد به کم" },
  { value: "bestSelling", label: "پرفروش‌ترین" },
  { value: "mostPopular", label: "محبوب‌ترین" },
];

export default function SortSelect() {
  const { filters, setFilters } = useProductFilter();
  function handleChangeSort(value: string) {
    setFilters({ sort: value });
  }
  return (
    <Select value={filters.sort ?? ""} onValueChange={handleChangeSort}>
      <SelectTrigger className={cn("hidden w-[200px] md:flex md:w-[240px]")}>
        <SelectValue placeholder={"مرتب سازی براساس"} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
