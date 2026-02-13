import { useState } from "react";
import BottomSheet from "./BottomSheet";
import { CloseSquare } from "iconsax-reactjs";
import Button from "./Button";
import FilterSection from "./FilterSection";
import Filter from "./Filter";
import { colors } from "../data/colors";
import { brands } from "../data/brands";
import { useCategories } from "../features/categories/useCategories";
import Spinner from "./Spinner";

export default function FilterTest() {
  const { categories, isLoading } = useCategories();

  const [open, setOpen] = useState(false);
  if (isLoading) return <Spinner />;
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-stone-200 px-4 py-2 text-white"
      >
        فیلترها
      </button>

      <BottomSheet open={open} onClose={() => setOpen(false)}>
        <div className="flex items-center gap-2 p-4">
          <button onClick={() => setOpen(false)} className="text-xl font-bold">
            <CloseSquare size={26} className="cursor-pointer" />
          </button>
          <h2 className="text-lg font-bold">فیلترها</h2>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          <FilterSection title="دسته بندی">
            <Filter
              filterField="category"
              options={categories}
              direction="vertical"
            />
          </FilterSection>
          <FilterSection title="رنگ">
            <Filter
              filterField="colors"
              options={colors}
              direction="horizontal"
            />
          </FilterSection>
          <FilterSection title=" برند">
            <Filter
              filterField="brands"
              options={brands}
              direction="vertical"
            />
          </FilterSection>
          <FilterSection title="محدوده قیمت"></FilterSection>
        </div>

        <div className="flex gap-3 border-t p-4">
          <Button variation="secondary" full>
            پاک‌سازی
          </Button>

          <Button full onClick={() => setOpen(false)}>
            اعمال
          </Button>
        </div>
      </BottomSheet>
    </>
  );
}
