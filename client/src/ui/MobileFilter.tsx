import * as React from "react";

import { Filter, SortAsc, SlidersHorizontal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area.js";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.js";
import PriceRangeFilter from "./PriceRangeFilter.js";
import { Spinner } from "@/components/ui/spinner.js";
import FilterCheckboxGroup from "./FilterCheckboxGroup.js";
import { brands } from "@/data/brands.js";
import { colors } from "@/data/colors.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.js";
import { cn } from "@/lib/utils.js";
import Button from "./Button.js";
import { useCategories } from "@/features/categories/hooks/useCategories.js";

const filterChips = [
  { id: "sort", label: "مرتب‌سازی", icon: <SortAsc size={16} /> },
  { id: "price", label: "قیمت", icon: <SlidersHorizontal size={16} /> },
  { id: "category", label: "دسته‌بندی", icon: <Filter size={16} /> },
  { id: "brand", label: "برند", icon: <Filter size={16} /> },
  { id: "color", label: "رنگ", icon: <Filter size={16} /> },
];

export default function MobileFilter({ className }: { className?: string }) {
  const { categories, isLoading } = useCategories();

  const [openSheet, setOpenSheet] = React.useState<string | null>(null);

  const handleOpen = (id: string) => {
    setOpenSheet(id);
  };

  const handleClose = () => {
    setOpenSheet(null);
  };

  return (
    <div
      className={cn(
        "block w-full overflow-x-auto border-b not-last:space-y-4 md:hidden",
        className,
      )}
    >
      <div>
        <div className="flex gap-2 p-3">
          {filterChips.map((chip) => (
            <Sheet
              key={chip.id}
              open={openSheet === chip.id}
              onOpenChange={(open) => !open && handleClose()}
            >
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex h-8 flex-1 items-center justify-center gap-2 rounded-full border px-3 py-1 text-xs"
                  onClick={() => handleOpen(chip.id)}
                >
                  {chip.icon}
                  {chip.label}
                </Button>
              </SheetTrigger>

              <SheetContent side="bottom" className="h-[70vh] p-0 sm:h-[80vh]">
                <SheetHeader className="border-b p-4">
                  <SheetTitle className="flex items-center gap-2 text-lg">
                    {chip.icon}
                    {chip.label}
                  </SheetTitle>
                </SheetHeader>

                <ScrollArea className="h-[calc(100%-60px)] p-4">
                  {chip.id === "price" && (
                    <div className="space-y-4">
                      <h4 className="font-medium">محدوده قیمت (تومان)</h4>
                      <PriceRangeFilter />
                    </div>
                  )}

                  {chip.id === "category" && (
                    <div className="space-y-4">
                      <h4 className="font-medium">دسته‌بندی‌ها</h4>
                      {isLoading ? (
                        <div className="flex justify-center py-8">
                          <Spinner />
                        </div>
                      ) : (
                        <FilterCheckboxGroup
                          options={categories}
                          type="categories"
                        />
                      )}
                    </div>
                  )}

                  {chip.id === "brand" && (
                    <div className="space-y-4">
                      <h4 className="font-medium">برندها</h4>
                      <FilterCheckboxGroup options={brands} type="brands" />
                    </div>
                  )}

                  {chip.id === "color" && (
                    <div className="space-y-4">
                      <h4 className="font-medium">رنگ‌ها</h4>
                      <FilterCheckboxGroup options={colors} type="colors" />
                    </div>
                  )}

                  {chip.id === "sort" && (
                    <div className="space-y-4">
                      <h4 className="font-medium">مرتب‌سازی بر اساس</h4>
                      <Select defaultValue="newest">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="انتخاب کنید" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mostViewed">
                            پربازدیدترین
                          </SelectItem>
                          <SelectItem value="newest">جدیدترین</SelectItem>
                          <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
                          <SelectItem value="priceLowToHigh">
                            قیمت: کم به زیاد
                          </SelectItem>
                          <SelectItem value="priceHighToLow">
                            قیمت: زیاد به کم
                          </SelectItem>
                          <SelectItem value="bestSelling">
                            پرفروش‌ترین
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </ScrollArea>

                <div className="bg-background sticky bottom-0 border-t p-4">
                  <Button onClick={handleClose} className="w-full">
                    اعمال و بستن
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </div>
    </div>
  );
}
