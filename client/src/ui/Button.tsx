import type { ComponentProps } from "react";

type ButtonSize = "small" | "medium" | "large";
type ButtonVariant = "primary" | "secondary" | "danger";

type Props = ComponentProps<"button"> & {
  variation?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
};

function Button({
  children,
  variation = "primary",
  size = "medium",
  full,
  ...props
}: Props) {
  const base =
    "border-none  flex items-center  gap-1.5  rounded-sm cursor-pointer justify-center transition-all duration-200 disabled:cursor-not-allowed disabled:bg-[#945CB4]";

  const sizes = {
    small: "p-1 pl-2 text-100  font-bold",
    medium: "px-4 py-3 text-200 font-medium   text-center",
    large: "px-6 py-3 text-300 font-semibold  text-center",
  };

  const variations = {
    primary: "bg-primary text-white hover:bg-primary/90 active:bg-primary/80",
    secondary:
      "text-primary bg-white border border-grey-1 hover:bg-grey-100 active:bg-grey-200",
    danger: "text-white bg-red-700 hover:bg-red-800 active:bg-red-900",
  };

  return (
    <button
      className={`${base} ${variations[variation]} ${sizes[size]} ${full ? "w-full" : "w-auto"}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
