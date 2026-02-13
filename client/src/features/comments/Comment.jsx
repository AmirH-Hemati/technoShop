import { Dislike, Like1 } from "iconsax-reactjs";
import { formatDate } from "../../utils/helper";

function Comment({ comment }) {
  return (
    <div className="border-grey-300 space-y-3 rounded-lg border-t border-b p-3 lg:py-6">
      <div className="flex flex-col gap-2 space-y-1 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-grey-700 text-sm font-normal">
            {comment?.user?.name || "کاربر ناشناس"}
          </p>
        </div>
        <span className="text-xs font-normal text-black">
          {formatDate(new Date(comment?.createdAt))}
        </span>
      </div>

      <p className="text-right text-xs leading-normal font-normal md:text-sm lg:text-base">
        {comment?.comment}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-tint-5 cursor-pointer text-xs font-bold">پاسخ</p>
        <div className="flex items-center gap-2">
          <Dislike size={24} className="text-grey-500" />
          <Like1 size={24} className="text-red-500" />
        </div>
      </div>
    </div>
  );
}

export default Comment;
