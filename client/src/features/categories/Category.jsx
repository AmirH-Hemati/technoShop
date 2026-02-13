import { BASE_URL } from "../../services/axiosInstance";

function Category({ category }) {
  return (
    <li className="bg-grey-0 flex aspect-square w-40 flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg p-2  transition-all hover:scale-105">
      <img
        src={category.image}
        alt={category.label}
        className="h-[70px] w-[70px] object-cover object-center md:h-20 md:w-20"
      />
      <span className="text-center text-200 font-medium text-gray-800">
        {category.label}
      </span>
    </li>
  );
}

export default Category;
