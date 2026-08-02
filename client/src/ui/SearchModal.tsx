import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

import { useOutsideClick } from "../utils/useOutsideClick.js";

type Props = { onClose: () => void; children: ReactNode };
const SearchModal = ({ onClose, children }: Props) => {
  const ref = useOutsideClick<HTMLDivElement>(onClose);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div className="flex justify-center px-4 pt-20 sm:pt-28 md:pt-24">
        <div
          ref={ref}
          className="relative w-full max-w-3xl rounded-lg bg-white shadow-xl"
        >
          <div className="max-h-[70vh] overflow-y-auto p-4 pt-12">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default SearchModal;
