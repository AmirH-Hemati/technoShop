import { Outlet } from "react-router-dom";

import BreadcrumbNav from "@/ui/BreadcrumbNav.js";
import Footer from "@/ui/Footer.js";
import Logout from "@/ui/Logout.js";
import MainHeader from "@/ui/MainHeader.js";
import Sidebar from "@/ui/Sidebar.js";
import SidebarMenu from "@/ui/SidebarMenu.js";

import UserAvatar from "@/features/authentication/components/UserAvatar.js";

import { sidebar } from "@/data/AccountSidebarItmes.js";

function AccountLayout() {
  return (
    <div>
      <MainHeader />

      <div className="mt-6 mb-16 space-y-6">
        <BreadcrumbNav />
        <div className="hidden gap-6 lg:grid lg:grid-cols-[1fr_3fr]">
          <Sidebar>
            <UserAvatar />
            <SidebarMenu sidebar={sidebar} />
            <Logout />
          </Sidebar>

          <main className="overflow-x-hidden">
            <Outlet />
          </main>
        </div>

        <div className="lg:hidden">
          <main>
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AccountLayout;
