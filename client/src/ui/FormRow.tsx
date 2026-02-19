import type { Icon } from "iconsax-reactjs";
import type { ReactElement } from "react";

type Props = {
  children: ReactElement;
  label: string;
  error: string;
  icon: Icon;
};
function FormRow({ children, label, error, icon }: Props) {
  return (
    <div className="flex flex-col justify-center gap-2 px-2">
      {label && (
        <label
          htmlFor={children.props.id}
          className="text-grey-900 flex items-center gap-1 text-xs font-medium md:text-sm"
        >
          {icon}
          {label}
        </label>
      )}

      {children}

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
    </div>
  );
}

export default FormRow;
