import { Outlet } from "react-router-dom";

import { sidebar } from "../data/AdminSidebarItmes";
import Sidebar from "./Sidebar";
import SidebarMenu from "./SidebarMenu";
import HeaderAdmin from "./HeaderAdmin";
import Logo from "./Logo";

function AdminLayout() {
  return (
    <div className="flex h-screen w-full grid-cols-1 flex-col lg:grid lg:grid-cols-[13rem_1fr] lg:grid-rows-[auto_1fr]">
      <HeaderAdmin />
      <Sidebar>
        <Logo />
        <SidebarMenu sidebar={sidebar} />
      </Sidebar>

      <main className="bg-grey-50 flex-1 overflow-auto px-4 py-2 lg:px-8 lg:py-6">
        <div className="mx-auto my-0 flex max-w-7xl flex-col gap-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
