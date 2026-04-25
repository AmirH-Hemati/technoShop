import { Moon } from "iconsax-reactjs";

import LogoutButton from "../features/authentication/LogoutButton";
import UserAvatar from "../features/authentication/userAvatar";
import ButtonIcon from "./ButtonIcon";

function HeaderAdmin() {
  return (
    <header className="border-grey-50 bg-grey-0 flex items-center gap-4 border-b px-4 py-2 lg:px-8 lg:py-4">
      <UserAvatar />
      <ButtonIcon>
        <Moon />
      </ButtonIcon>
      <LogoutButton />
    </header>
  );
}

export default HeaderAdmin;
