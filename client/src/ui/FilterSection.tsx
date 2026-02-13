import { useState, type PropsWithChildren } from "react";
import { ArrowDown2, Size } from "iconsax-reactjs";

export type Props = PropsWithChildren & {
  title: string;
};
function FilterSection({ title, children }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="shadow-xs">
      <button
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        className="hover:bg-grey-50 flex w-full cursor-pointer items-center justify-between px-4 py-3 transition"
      >
        <span className="text-grey-700 text-200 font-medium">{title}</span>
        <ArrowDown2
          className={`text-primary transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "h-auto py-2 opacity-100" : "h-0 py-0 opacity-0"
        }`}
      >
        <div className="space-y-2 px-4">{children}</div>
      </div>
    </div>
  );
}

export default FilterSection;
