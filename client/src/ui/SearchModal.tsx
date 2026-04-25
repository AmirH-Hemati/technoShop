import { useEffect } from "react";

import { useOutsideClick } from "../utils/useOutsideClick.js";

const SearchModal = ({ open, onClose, children, extraRef }) => {
  const ref = useOutsideClick(onClose, extraRef);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 top-40 z-50 flex justify-center sm:top-28 md:top-24">
      <div
        ref={ref}
        className="shadow-1 w-[95%] max-w-3xl rounded-xl bg-white sm:w-full"
      >
        <div className="max-h-80 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
};

export default SearchModal;
