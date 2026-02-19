import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader.js";
import Footer from "./Footer.js";
import ScrollToTopButton from "./ScrollToTopButton.js";
import BreadcrumbNav from "./BreadcrumbNav.js";

function MainLayout() {
  return (
    <>
      <MainHeader />
      <ScrollToTopButton />
      <main className="mx-auto w-full overflow-hidden px-3 py-1 md:px-5 md:py-3 lg:px-10 lg:py-6">
        <BreadcrumbNav />
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;
