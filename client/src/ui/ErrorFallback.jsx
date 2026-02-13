import Button from "./Button";
import Heading from "./Heading";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-4xl">⚠️</span>

          <Heading type="h1" className="text-xl font-semibold text-gray-800">
            مشکلی پیش اومد
          </Heading>

          <p className="text-sm leading-relaxed text-gray-500">
            {error?.message || "در حال حاضر امکان انجام این عملیات وجود ندارد."}
          </p>

          <Button full onClick={resetErrorBoundary}>
            تلاش مجدد
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorFallback;
