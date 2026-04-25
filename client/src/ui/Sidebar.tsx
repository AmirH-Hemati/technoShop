import type { PropsWithChildren } from "react";

type Props = PropsWithChildren;
function Sidebar({ children }: Props) {
  return (
    <aside className="bg-grey-0 hidden h-[756px] overflow-hidden rounded-lg shadow-sm lg:row-span-full lg:flex lg:w-full lg:flex-col lg:gap-6">
      {children}
    </aside>
  );
}

export default Sidebar;
