import { ArrowRight } from "iconsax-reactjs";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import { BASE_URL } from "../../services/axiosInstance";
import { useAddComment } from "./useAddComment";
import { useState } from "react";

function AddComment({ onCloseModal, item }) {
  const [comment, setComment] = useState("");
  const { addComment, isCreateing } = useAddComment(useAddComment);

  function handelAddComment() {
    if (!comment) return;
    addComment({ comment, productId: item._id });
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="border-grey-200 flex items-center gap-3 border-b py-4">
        <ArrowRight className="cursor-pointer" onClick={onCloseModal} />
        <span> ثبت دیدگاه</span>
      </div>
      <div className="border-grey-200 flex items-start gap-3 border-b px-10 py-6">
        <img
          src={`${BASE_URL}img/products/${item.imageCover}`}
          alt={item.name}
          className="h-12 object-cover object-center"
        />
        <p className="text-base font-medium">{item.name}</p>
      </div>

      <div>
        <p className="mb-4 text-base font-bold">ثبت دیدگاه * </p>

        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="متن نظر خود را درباره کالا اینجا وارد کنید ."
          rows={5}
        />
        <div className="bg-grey-0 border-grey-300 -mt-3 flex w-full items-center justify-between rounded-b-md border p-3">
          <p className="text-grey-800 text-sm">امیر حسین همتی</p>
          <p className="bg-grey-100 text-grey-800 rounded-full px-4 py-2 text-xs">
            ارسال با نام شما
          </p>
        </div>
      </div>
      <Button disabled={isCreateing} onClick={handelAddComment} size="large">
        ثبت دیدگاه
      </Button>
      <p className="text-center text-xs">
        ثبت دیدگاه به معنی موافقت باقوانین انتشار ما هستید.
      </p>
    </div>
  );
}

export default AddComment;
