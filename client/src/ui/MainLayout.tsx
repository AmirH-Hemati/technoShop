import { Outlet } from "react-router-dom";

import BreadcrumbNav from "./BreadcrumbNav.js";
import Footer from "./Footer.js";
import MainHeader from "./MainHeader.js";
import ScrollToTopButton from "./ScrollToTopButton.js";

function MainLayout() {
  return (
    <>
      <MainHeader />
      <ScrollToTopButton />
      <main className="mx-auto w-full overflow-hidden px-3 py-1">
        <BreadcrumbNav />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
