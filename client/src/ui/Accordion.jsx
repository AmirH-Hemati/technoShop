import { useState } from "react";

import { Add, Minus } from "iconsax-reactjs";

const Accordion = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`hover:text-primary hover:border-primary/40 bg-grey-0 shadow-2 w-full rounded-xl border border-gray-300 transition-all duration-600`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center justify-between px-6 py-6 text-right text-sm font-semibold"
      >
        <span>{title}</span>
        <span className="text-xl">{open ? <Minus /> : <Add />}</span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-600 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} `}
      >
        <div className="px-4 pb-4 text-sm text-gray-600">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
