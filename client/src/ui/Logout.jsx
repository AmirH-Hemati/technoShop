import { LogoutCurve } from "iconsax-reactjs";
import { useLogout } from "../features/authentication/useLogout";
import SpinnerMini from "./SpinnerMini";

function Logout({ showLabel = false }) {
  const { isPending, logout } = useLogout();
  return (
    <div
      className={`hover:bg-red-50 mt-auto flex cursor-pointer items-center gap-2 px-3 py-4 text-sm font-medium text-red-500 transition-all duration-300 hover:rounded-sm hover:text-red-900`}
      onClick={logout}
    >
      {isPending && <SpinnerMini />}
      <LogoutCurve />
      {<span>خروج</span>}
    </div>
  );
}

export default Logout;
