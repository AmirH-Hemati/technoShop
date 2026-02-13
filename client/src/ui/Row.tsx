import type { PropsWithChildren, ReactElement } from "react";

export type Props = PropsWithChildren & { type?: string };

function Row({ children, type = "vertical" }: Props): ReactElement {
  return (
    <div
      className={`flex ${type === "horizontal" ? "flex-row items-center justify-between" : "flex-col gap-6"}`}
    >
      {children}
    </div>
  );
}

export default Row;
