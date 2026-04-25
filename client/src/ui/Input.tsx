import { type ComponentProps } from "react";

type Props = ComponentProps<"input">;
function Input(props: Props) {
  return (
    <input
      className="bg-grey-0 focus:ring-primary disabled:bg-grey-100 disabled:text-grey-400 disabled:border-grey-200 w-full rounded-md border border-gray-400 px-3 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-600 focus:ring-2 disabled:cursor-not-allowed"
      {...props}
    />
  );
}

export default Input;
