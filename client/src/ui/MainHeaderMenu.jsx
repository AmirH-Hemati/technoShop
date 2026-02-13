import { Call, Category, ChartSuccess, Home } from "iconsax-reactjs";
import { NavLink } from "react-router-dom";

function MainHeaderMenu() {
  return (
    <nav className="hidden w-full md:block">
      <ul className="text-grey-900 text-300 mr-30 flex w-full items-center gap-8">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? "text-primary " : ""}`
            }
          >
            <Home />
            <span> صفحه اصلی</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/products"}
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? "text-primary " : ""}`
            }
          >
            <Category />
            <span>محصولات</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/aboutUs"}
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? "text-primary " : ""}`
            }
          >
            <ChartSuccess />
            <span>درباره ما</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ContactUs"
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? "text-primary " : ""}`
            }
          >
            <Call />
            <span>ارتباط با ما</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainHeaderMenu;
