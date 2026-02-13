import { Star1 } from "iconsax-reactjs";
import { formatDate } from "../../utils/helper";

function Review({ review }) {
  const rating = review?.rating || 0;

  return (
    <div className="border-grey-300 space-y-3 rounded-lg border-t border-b p-4 lg:py-6">
      <div className="flex flex-col gap-2 space-y-1 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-grey-700 text-sm font-normal">
            {review?.user?.name || "کاربر ناشناس"}
          </p>

          <div className="flex items-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star1
                key={i}
                size="20"
                variant={i < rating ? "Bold" : "Linear"}
              />
            ))}
          </div>
        </div>

        <span className="text-xs font-normal text-black">
          {formatDate(new Date(review?.createdAt))}
        </span>
      </div>

      {review?.review && (
        <p className="text-right text-xs leading-normal font-normal md:text-sm lg:text-base">
          {review?.review}
        </p>
      )}
    </div>
  );
}

export default Review;
