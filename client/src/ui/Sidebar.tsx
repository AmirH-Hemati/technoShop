import type { PropsWithChildren } from "react";

type Props = PropsWithChildren;
function Sidebar({ children }: Props) {
  return (
    <aside className="bg-grey-0 hidden min-h-[756px] overflow-hidden rounded-lg shadow-lg lg:row-span-full lg:flex lg:w-full lg:flex-col lg:gap-6 lg:p-1">
      {children}
    </aside>
  );
}

export default Sidebar;
