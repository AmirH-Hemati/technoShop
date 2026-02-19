import { Layer } from "iconsax-reactjs";

import Modal from "@/ui/Modal.js";
import Button from "@/ui/Button.js";

import AddComment from "./AddComment.js";
import CommentsList from "./CommentsList.js";

import type { SelectOptionType } from "@/types/select-option-types.js";
import type { ProductType } from "../products/types/product.js";

export const tabs: SelectOptionType[] = [
  { label: "جدیدترین", value: "newest" },
  { label: "قدیمی‌ترین", value: "oldest" },
  { label: "بیشترین امتیاز", value: "highest_rated" },
  { label: "کمترین امتیاز", value: "lowest_rated" },
];

type Props = { product: ProductType };
function Comments({ product }: Props) {
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
          <Modal>
            <Modal.Open open="addComment">
              <Button>نظر خود را ثبت کنید</Button>
            </Modal.Open>
            <Modal.Window name="addComment">
              <AddComment<ProductType> item={product} />
            </Modal.Window>
          </Modal>
        </div>
      </div>
      <CommentsList product={product} />
    </div>
  );
}

export default Comments;
