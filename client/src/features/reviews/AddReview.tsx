import { useState } from "react";
import { ArrowRight, Star1 } from "iconsax-reactjs";

import { useAddReview } from "./useAddReview.js";
import Textarea from "@/ui/Textarea.js";
import Button from "@/ui/Button.js";

type Props<T> = {
  item: T;
  onCloseDialog?: () => void;
};
type ItemWithImage = {
  _id: string;
  imageCover: string;
  name: string;
};

function AddReview<T extends ItemWithImage>({ onCloseDialog, item }: Props<T>) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const { addReview, isCreating } = useAddReview();

  function handelAddReview() {
    if (!rating || !review) return;

    addReview(
      {
        review,
        rating,
        productId: item._id,
      },
      {
        onSuccess: () => {
          onCloseDialog?.();
        },
      },
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="border-grey-200 flex items-center gap-3 border-b py-4">
        <ArrowRight className="cursor-pointer" onClick={onCloseDialog} />
        <span className="text-400 font-semibold">ثبت امتیاز و نظر</span>
      </div>

      <div className="border-grey-200 flex items-start gap-3 border-b px-2 py-4">
        <img
          src={item.imageCover}
          alt={item.name}
          className="h-16 w-16 rounded-md object-cover object-center"
        />
        <p className="text-300 font-medium">{item.name}</p>
      </div>

      <div className="border-grey-200 flex items-center justify-between border-b px-4 py-1">
        <p className="mb-2 font-medium text-200">امتیاز شما </p>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star1
              key={i}
              variant={i <= rating ? "Bold" : "Linear"}
              className={`cursor-pointer ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}
              onClick={() => setRating(i)}
              size={24}
            />
          ))}
        </div>
      </div>
      <div className="px-4">
        <p className="mb-4 text-200 font-medium"> بازخورد شما </p>
        <Textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="بازخورد خود را درباره کالا بنویسید..."
          rows={3}
        />
      </div>

      <Button disabled={isCreating} onClick={handelAddReview} size="medium">
        ثبت امتیاز
      </Button>

      <p className="text-center text-100">
        ثبت امتیاز به معنی موافقت با قوانین انتشار ما است.
      </p>
    </div>
  );
}

export default AddReview;
