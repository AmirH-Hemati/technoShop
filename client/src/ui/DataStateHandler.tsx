import Spinner from "./Spinner.js";
import Button from "./Button.js";
import type { PropsWithChildren } from "react";
import type { AppError } from "@/types/AppError.type.js";

type Props<T> = PropsWithChildren & {
  isLoading: boolean;
  error?: AppError | null;
  data: T[];
  onRetry?: () => void;
  emptyMessage?: string;
};

function DataStateHandler<T>({
  isLoading,
  error,
  data,
  onRetry,
  emptyMessage = "داده‌ای برای نمایش وجود ندارد",
  children,
}: Props<T>) {
  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    const message =
      error?.response?.data?.message || error?.message || "خطایی رخ داده است";

    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-gray-600">{message}</p>

        {onRetry && <Button onClick={onRetry}>دوباره تلاش کن</Button>}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-sm text-gray-500">{emptyMessage}</div>
    );
  }

  return children;
}

export default DataStateHandler;
