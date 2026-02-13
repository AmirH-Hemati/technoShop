import type { SelectOptionType } from "@/types/select-option-types.js";
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
];

function CategoriesIcon() {
  function handelSetCategory(category: string) {
    console.log(category);
  }
  return (
    <ul className="flex max-w-full items-center justify-center gap-6 overflow-x-auto md:gap-8 lg:gap-12">
      {categories.map((c) => (
        <li
          key={c.value}
          onClick={() => handelSetCategory(c.value)}
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 transition duration-300`}
        >
          <c.icon size={48} />
          <span className="text-center text-sm leading-normal font-normal text-gray-500 md:text-base lg:text-lg">
            {c.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
// ${category === c.value ? "border-primary border-b-4" : ""}

export default CategoriesIcon;
