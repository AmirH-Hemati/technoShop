import Spinner from "./Spinner.jsx";
import Button from "./Button.jsx";
import type { PropsWithChildren } from "react";
import type { AxiosError } from "axios";

type Props = PropsWithChildren & {
  isLoading: boolean;
  error: AxiosError;
  data: object[];
  onRetry: () => void;
  emptyMessage: string;
};

function DataStateHandler({
  isLoading,
  error,
  data,
  onRetry,
  emptyMessage = "داده‌ای برای نمایش وجود ندارد",
  children,
}: Props) {
  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    const message =
      error?.response?.data?.message || error?.message || "خطایی رخ داده است";

    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-gray-600">{message}</p>

        {onRetry && (
          <Button variation="ghost" onClick={onRetry}>
            دوباره تلاش کن
          </Button>
        )}
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
