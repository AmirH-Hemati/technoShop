import { LogoutCurve } from "iconsax-reactjs";

import { useLogout } from "../features/authentication/hooks/useLogout.js";
import SpinnerMini from "./SpinnerMini.js";

function Logout() {
  const { isPending, logout } = useLogout();
  return (
    <div
      className={`mt-auto flex cursor-pointer items-center gap-2 px-3 py-4 text-sm font-medium text-red-500 transition-all duration-300 hover:rounded-sm hover:bg-red-50 hover:text-red-900`}
      onClick={() => logout()}
    >
      {isPending && <SpinnerMini />}
      <LogoutCurve />
      {<span>خروج</span>}
    </div>
  );
}

export default Logout;
