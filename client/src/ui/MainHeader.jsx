import { Moon } from "iconsax-reactjs";
import HeaderButtons from "./HeaderButtons";
import Logo from "./Logo";
import MainHeaderMenu from "./MainHeaderMenu";
import SearchInput from "./SearchInput";
import MenuMobile from "./MenuMobile";

function MainHeader() {
  return (
    <header className="bg-grey-0  flex w-full  flex-col gap-8 border-b border-gray-300  py-3 overflow-hidden">
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
