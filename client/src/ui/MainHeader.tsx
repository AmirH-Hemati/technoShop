import { Moon } from "iconsax-reactjs";

import SearchInput from "../features/products/components/SearchInputProduct.js";
import HeaderButtons from "./HeaderButtons.jsx";
import Logo from "./Logo.js";
import MainHeaderMenu from "./MainHeaderMenu.jsx";
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
