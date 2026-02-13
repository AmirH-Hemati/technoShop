import { ArrowRight, Star1 } from "iconsax-reactjs";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import { BASE_URL } from "../../services/axiosInstance";
import { useState } from "react";
import { useAddReview } from "./useAddReview";

function AddReview({ onCloseModal, item }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const { addReview, isCreating } = useAddReview();

  function handelAddReview() {
    if (!rating || !review) return;
    console.log({
      review,
      rating,
      productId: item._id,
    });
    addReview(
      {
        review,
        rating,
        productId: item._id,
      },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      },
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="border-grey-200 flex items-center gap-3 border-b py-4">
        <ArrowRight className="cursor-pointer" onClick={onCloseModal} />
        <span className="text-sm">ثبت امتیاز و نظر</span>
      </div>

      <div className="border-grey-200 flex items-start gap-3 border-b px-10 py-4">
        <img
          src={`${BASE_URL}img/products/${item.imageCover}`}
          alt={item.name}
          className="h-12 w-12 rounded-md object-cover object-center"
        />
        <p className="text-xs font-medium lg:text-sm">{item.name}</p>
      </div>

      {/* ⭐ بخش امتیاز دهی */}
      <div className="border-grey-200 flex items-center justify-between border-b px-4 py-1">
        <p className="mb-2 text-xs font-medium">امتیاز شما </p>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star1
              key={i}
              variant={i <= rating && "Bold"}
              className={`cursor-pointer ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}
              onClick={() => setRating(i)}
              size={24}
            />
          ))}
        </div>
      </div>
      {/* 📝 کامنت */}
      <div className="px-4">
        <p className="mb-4 text-xs font-medium"> بازخورد شما </p>
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

      <p className="text-center text-[13px]">
        ثبت امتیاز به معنی موافقت با قوانین انتشار ما است.
      </p>
    </div>
  );
}

export default AddReview;
