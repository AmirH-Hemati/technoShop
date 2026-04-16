import { useState } from "react";
import { Layer } from "iconsax-reactjs";

import type { SelectOptionType } from "@/types/select-option-types.js";
import Button from "@/ui/Button.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.js";

import AddComment from "./AddComment.js";
import CommentsList from "./CommentsList.js";
import type { ProductType } from "../products/types/product.js";

export const tabs: SelectOptionType[] = [
  { label: "جدیدترین", value: "newest" },
  { label: "قدیمی‌ترین", value: "oldest" },
  { label: "بیشترین امتیاز", value: "highest_rated" },
  { label: "کمترین امتیاز", value: "lowest_rated" },
];

type Props = { product: ProductType };
function Comments({ product }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  function handlecloseDialog() {
    setOpenDialog(false);
  }
  return (
    <div className="mt-6">
      <div className="flex flex-row items-center md:justify-between">
        <div className="flex flex-wrap items-center md:gap-3">
          <div className="flex items-center gap-1">
            <Layer />
            <span className="text-sm font-medium text-gray-700 md:text-base">
              مرتب‌سازی:
            </span>
          </div>

          {tabs.map((tab) => (
            <button
              key={tab.value}
              className="hover:border-primary hover:text-primary text-grey-600 rounded-lg px-3 py-1.5 text-sm transition md:text-base"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger>
              <Button>نظر خود را ثبت کنید</Button>
            </DialogTrigger>
            <DialogContent
              showCloseButton={false}
              className="sm:!max-w-1xl !w-full overflow-auto sm:!max-h-[85vh]"
              style={{ scrollbarWidth: "thin" }}
            >
              <AddComment<ProductType>
                item={product}
                onCloseDialog={handlecloseDialog}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <CommentsList product={product} />
    </div>
  );
}

export default Comments;
