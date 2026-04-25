import type { PropsWithChildren } from "react";

type Props = PropsWithChildren & { onClick: () => void; disabled?: boolean };
function ButtonIcon({ children, onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="hover:bg-grey-100 text-grey-8 bg-grey-50 cursor-pointer rounded-sm p-2 transition-all duration-300"
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
