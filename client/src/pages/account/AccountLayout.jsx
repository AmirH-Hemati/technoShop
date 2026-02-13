import UserAvatar from "../../features/authentication/userAvatar";
import Sidebar from "../../ui/Sidebar";
import SidebarMenu from "../../ui/SidebarMenu";
import { sidebar } from "../../data/AccountSidebarItmes";
import MainHeader from "../../ui/MainHeader";
import { Outlet } from "react-router-dom";
import Logout from "../../ui/Logout";
import Footer from "../../ui/Footer";

function AccountLayout() {
  return (
    <div>
      <MainHeader />

      <div className="mt-10 mb-16">
        <div className="hidden gap-6 lg:grid lg:grid-cols-[1fr_4fr]">
          <Sidebar>
            <UserAvatar />
            <SidebarMenu sidebar={sidebar} />
            <Logout />
          </Sidebar>
          <main className="overflow-x-hidden">
            <Outlet />
          </main>
        </div>

        <div className="px-4 py-1 md:px-4 lg:hidden">
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
