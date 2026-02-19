import { Moon } from "iconsax-reactjs";
import HeaderButtons from "./HeaderButtons.jsx";
import Logo from "./Logo.js";
import MainHeaderMenu from "./MainHeaderMenu.jsx";
import SearchInput from "./SearchInput.js";
import MenuMobile from "./MenuMobile.js";

function MainHeader() {
  return (
    <header className="bg-grey-0 flex w-full flex-col gap-8 overflow-hidden border-b border-gray-300 py-3">
      <div className="flex w-full items-center justify-between">
        <Logo />
        <div className="hidden lg:block">
          <SearchInput />
        </div>
        <HeaderButtons />
        <div className="text-grey-600 md:hidden">
          <Moon />
        </div>
      </div>
      <div className="block lg:hidden">
        <SearchInput />
      </div>
      <MainHeaderMenu />
      <MenuMobile />
    </header>
  );
}

export default MainHeader;
