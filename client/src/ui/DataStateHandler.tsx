import type { PropsWithChildren } from "react";

import type { AppError } from "@/types/AppError.type.js";

import Spinner from "./Spinner.js";

type Props<T> = PropsWithChildren & {
  isLoading: boolean;
  error: Error | AppError | null;
  data: T[] | undefined;
  emptyMessage?: string;
};

function DataStateHandler<T>({
  isLoading,
  error,
  data,
  emptyMessage = "داده‌ای برای نمایش وجود ندارد",
  children,
}: Props<T>) {
  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    const message = error?.response?.data?.message || "خطایی رخ داده است";

    return <p className="my-4 text-200 text-grey-800 ">{message}</p>;
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-200 text-grey-900 my-10 text-center font-medium">
        {emptyMessage}
      </p>
    );
  }

  return children;
}

export default DataStateHandler;
