import { Call, Category, ChartSuccess, Home } from "iconsax-reactjs";
import { NavLink } from "react-router-dom";

const links = [
  {
    href: "/ContactUs",
    icon: Call,
    label: "ارتباط با ما",
  },
  {
    href: "/aboutUs",
    icon: ChartSuccess,
    label: "درباره ما ",
  },

  {
    href: "/products",
    icon: Category,
    label: "محصولات",
  },
  {
    href: "/",
    icon: Home,
    label: "خانه",
  },
];

function MainHeaderMenu() {
  return (
    <nav className="hidden w-full md:block">
      <ul className="text-grey-900 text-300 mr-30 flex w-full items-center gap-8">
        {links.reverse().map((link) => (
          <li key={link.href}>
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "text-primary" : ""}`
              }
            >
              <link.icon />
              <span className="text-300 font-medium">{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MainHeaderMenu;
