import { ArrowLeft2, Logout } from "iconsax-reactjs";

import { Link } from "react-router-dom";

import { sidebar } from "../data/AccountSidebarItmes.js";

function AccountMobileMenu() {
  return (
    <div className="flex flex-col gap-3 lg:hidden">
      {sidebar.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="border-grey-200 bg-grey-0 flex cursor-pointer items-center justify-between rounded-xl border p-4 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="bg-grey-100 flex h-10 w-10 items-center justify-center rounded-full">
              <item.icon size={20} className="text-grey-800" />
            </div>
            <span className="text-grey-800 text-sm font-medium">
              {item.label}
            </span>
          </div>

          <ArrowLeft2 size={20} className="text-grey-400" />
        </Link>
      ))}
      <div className="border-grey-200 bg-grey-0 flex items-center justify-between rounded-xl border p-4 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <Logout size={20} className="text-red-500" />
          </div>
          <span className="text-sm font-medium text-red-800">
            خروج از حساب کاربری
          </span>
        </div>

        <ArrowLeft2 size={20} className="text-red-400" />
      </div>
    </div>
  );
}

export default AccountMobileMenu;
