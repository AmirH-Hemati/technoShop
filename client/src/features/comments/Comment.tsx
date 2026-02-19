import { Dislike, Like1, Star1 } from "iconsax-reactjs";

import { formatDate } from "@/utils/helper.js";

import type { CommentType } from "./types/comment.js";

type Props = { comment: CommentType };

function Comment({ comment }: Props) {
  return (
    <li className="border-grey-200 grid min-h-44 space-y-3 md:border-t md:p-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col space-y-1">
          <p className="text-grey-700 text-300 font-medium">
            {comment?.user?.name || "کاربر ناشناس"}
          </p>

          <div className="flex items-center">
            {Array.from({ length: 5 })
              .fill("")
              .map((star) => (
                <Star1 className="text-yellow-500" variant="Bold" size={20} />
              ))}
          </div>

          <span className="text-grey-800 text-200">
            {formatDate(new Date(comment?.createdAt))}
          </span>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <p className="text-grey-600 text-xs font-medium">
            ایا این نظر مفید بود؟
          </p>

          <div className="flex items-center gap-2">
            <Dislike size={22} className="text-grey-500 cursor-pointer" />
            <Like1 size={22} className="cursor-pointer text-red-500" />
          </div>
        </div>

        <button className="text-200 text-primary hidden cursor-pointer font-bold md:block">
          پاسخ
        </button>
      </div>

      <p className="text-grey-800 text-300 block leading-relaxed md:hidden">
        {comment?.comment}
      </p>

      <div className="flex items-center justify-between">
        <button className="text-200 text-primary cursor-pointer font-bold">
          پاسخ
        </button>

        <div className="flex items-center gap-2">
          <Dislike size={20} className="text-grey-500 cursor-pointer" />
          <Like1 size={20} className="cursor-pointer text-red-500" />
        </div>
      </div>
    </li>
  );
}

export default Comment;
