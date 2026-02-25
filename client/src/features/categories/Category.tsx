import type { CategoryType } from "./types/category.js";

function Category({ category }: { category: CategoryType }) {
  return (
    <li className="bg-grey-0 flex cursor-pointer flex-col items-center justify-center gap-4 transition-all hover:-translate-y-0.5">
      <img
        src={category.image}
        alt={category.label}
        className="h-18 w-18 rounded-lg object-cover object-center md:h-26 md:w-26"
      />
      <span className="text-200 text-center font-medium text-gray-800">
        {category.label}
      </span>
    </li>
  );
}

export default Category;
