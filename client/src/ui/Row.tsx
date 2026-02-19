import type { PropsWithChildren, ReactElement } from "react";

export type Props = PropsWithChildren & { type?: "vertical" | "horizontal" };

function Row({ children, type = "vertical" }: Props): ReactElement {
  return (
    <div
      className={`flex ${type === "horizontal" ? "flex-row items-center justify-between" : "flex-col gap-4"}`}
    >
      {children}
    </div>
  );
}

export default Row;
