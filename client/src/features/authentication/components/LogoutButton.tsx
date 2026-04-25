import { LogoutCurve } from "iconsax-reactjs";

import ButtonIcon from "../../../ui/ButtonIcon.js";
import SpinnerMini from "../../../ui/SpinnerMini.js";
import { useLogout } from "../hooks/useLogout.js";

function LogoutButton() {
  const { isPending, logout } = useLogout();
  return (
    <ButtonIcon onClick={logout}>
      {isPending ? <SpinnerMini /> : <LogoutCurve />}
    </ButtonIcon>
  );
}

export default LogoutButton;
