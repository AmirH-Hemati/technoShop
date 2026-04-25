import {
  Camera,
  Data,
  Devices,
  Game,
  Headphone,
  Icon,
  Mobile,
  Monitor,
  WatchStatus,
} from "iconsax-reactjs";

import { cn } from "@/lib/utils.js";

import useProductFilter from "@/hooks/useFiltersProducts.js";

import type { SelectOptionType } from "@/types/select-option-types.js";

type Category = SelectOptionType & { icon: Icon };

const categories: Category[] = [
  { label: "لپتاپ", icon: Monitor, value: "laptop" },
  { label: "تبلت", icon: Mobile, value: "mobile" },
  { label: "صوتی", icon: Headphone, value: "headphone" },
  { label: "پوشیدنی", icon: WatchStatus, value: "watch" },
  { label: "دوربین عکاسی", icon: Camera, value: "camera" },
  { label: "گیمینگ", icon: Game, value: "gaming" },
  { label: "مودم", icon: Data, value: "modem" },
  { label: "لوازم جانبی", icon: Devices, value: "devices" },
  { label: "گوشی همراه", icon: Devices, value: "گوشی-همراه" },
];

function CategoriesIcon() {
  const { filters, setFilters } = useProductFilter();

  function handelSetCategory(category: string) {
    if (filters.categories.includes(category)) {
      setFilters({
        categories: filters.categories.filter((c) => c !== category),
      });
    } else {
      setFilters({ categories: [...filters.categories, category] });
    }
  }
  return (
    <ul className="hidden max-w-full items-center justify-center gap-6 overflow-x-auto overflow-y-hidden md:flex md:gap-8">
      {categories.map((c) => (
        <li
          key={c.value}
          onClick={() => handelSetCategory(c.value)}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 transition duration-300 select-none",
            filters.categories.includes(c.value) && "border-primary border-b-4",
          )}
        >
          <c.icon size={42} className="text-grey-800" />
          <span className="text-grey-600 text-300">{c.label}</span>
        </li>
      ))}
    </ul>
  );
}

export default CategoriesIcon;
