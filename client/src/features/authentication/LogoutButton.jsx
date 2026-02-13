import { LogoutCurve } from "iconsax-reactjs";
import { useLogout } from "./useLogout";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";

function LogoutButton() {
  const { isPending, logout } = useLogout();
  return (
    <ButtonIcon onClick={logout}>
      {isPending ? <SpinnerMini /> : <LogoutCurve />}
    </ButtonIcon>
  );
}

export default LogoutButton;
