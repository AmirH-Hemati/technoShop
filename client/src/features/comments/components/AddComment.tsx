import { ArrowRight } from "iconsax-reactjs";

import { useState } from "react";

import Spinner from "@/ui/Spinner.js";
import { useUser } from "@/features/authentication/hooks/useUser.js";
import { useAddComment } from "../hooks/useAddComment.js";
import Textarea from "@/ui/Textarea.js";
import Button from "@/ui/Button.js";

type Props<T> = {
  item: T;
  onCloseDialog: () => void;
};

type ItemWithImage = {
  _id: string;
  imageCover: string;
  name: string;
};
function AddComment<T extends ItemWithImage>({
  item,
  onCloseDialog,
}: Props<T>) {
  const { user, isLoading, isAuthenticated } = useUser();
  const [comment, setComment] = useState("");
  const { addComment, isCreateing } = useAddComment();

  function handelAddComment() {
    if (!comment) return;
    addComment(
      { comment, productId: item._id },
      { onSettled: () => onCloseDialog() },
    );
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="border-grey-200 flex items-center gap-2 border-b py-4">
        <ArrowRight className="cursor-pointer" onClick={onCloseDialog} />
        <h3 className="text-400 font-medium"> ثبت دیدگاه</h3>
      </div>
      <div className="border-grey-200 flex items-start gap-3 border-b py-3">
        <img
          src={item.imageCover}
          alt={item.name}
          className="h-12 object-cover object-center"
        />
        <p className="text-300 font-medium">{item.name}</p>
      </div>

      <div>
        {!isAuthenticated ? (
          <p className="text-400 my-6 text-center font-medium">
            برای ثبت نظر خود لطفا وارد حساب کاربری خود شوید{" "}
          </p>
        ) : (
          <>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="متن نظر خود را درباره کالا اینجا وارد کنید ."
              rows={5}
            />
            <div className="bg-grey-0 border-grey-300 -mt-3 flex w-full items-center justify-between rounded-b-md border p-3">
              <p className="text-grey-800 text-200 font-medium">
                {isLoading ? <Spinner /> : user.name ? user.name : "ناشناس"}
              </p>
              <p className="bg-grey-100 text-grey-800 text-100 rounded-full px-3 py-1.5">
                ارسال با نام شما
              </p>
            </div>
          </>
        )}
      </div>
      <Button
        disabled={isCreateing || !isAuthenticated}
        onClick={handelAddComment}
        size="large"
      >
        ثبت دیدگاه
      </Button>
      <p className="text-100 text-center">
        ثبت دیدگاه به معنی موافقت باقوانین انتشار ما هستید.
      </p>
    </div>
  );
}

export default AddComment;
