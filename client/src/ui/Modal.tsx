import {
  cloneElement,
  createContext,
  useContext,
  useState,
  type MouseEvent,
  type PropsWithChildren,
  type ReactElement,
} from "react";
import { createPortal } from "react-dom";

import { CloseSquare } from "iconsax-reactjs";

import { useOutsideClick } from "../utils/useOutsideClick.js";

type ModalContextValue = {
  openName: string;
  open: (open: string) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextValue>({
  openName: "",
  open: () => {},
  close: () => {},
});

function Modal({ children }: PropsWithChildren) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  open: openWithName,
}: {
  children: ReactElement<{ onClick?: (e: MouseEvent) => void }>;
  open: string;
}) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(openWithName),
  });
}

function Window({
  children,
  name,
  closeButton = false,
}: {
  children: ReactElement<{ onCloseModal?: () => void }>;
  name: string;
  closeButton?: boolean;
}) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick<HTMLDivElement>(close);

  if (openName !== name) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        ref={ref}
        style={{ scrollbarWidth: "thin" }}
        className="relative  overflow-auto rounded-xl bg-white shadow-md transition-all duration-300"
      >
        {closeButton && (
          <button
            onClick={close}
            className="absolute top-10 left-6 rounded-md p-2 transition hover:bg-gray-100"
          >
            <CloseSquare size={26} />
          </button>
        )}

        <div className="flex h-full flex-col">
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
