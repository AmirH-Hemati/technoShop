import type { PropsWithChildren } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

type Props = PropsWithChildren<{
  type?: HeadingLevel;
}>;

const sizeClasses: Record<HeadingLevel, string> = {
  h1: "text-600 font-bold",
  h2: "text-500",
  h3: "text-300",
  h4: "text-400",
};

function Heading({ type = "h1", children }: Props) {
  const Tag = type;

  const baseClasses = "font-medium";
  const sizeClass = sizeClasses[type];

  return <Tag className={`${baseClasses} ${sizeClass}`}>{children}</Tag>;
}

export default Heading;
