import { Call, Category, Home, ShoppingCart, User } from "iconsax-reactjs";
import { NavLink } from "react-router-dom";
import Modal from "./Modal.js";
import Login from "../features/authentication/Login.js";
import { useUser } from "../features/authentication/useUser.js";

const links = [
  {
    href: "/ContactUs",
    icon: Call,
    label: "ارتباط با ما",
  },
  {
    href: "/cart",
    icon: ShoppingCart,
    label: "سبد خرید",
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

function MenuMobile() {
  const { user, isLoading } = useUser();
  return (
    <div className="fixed right-0 bottom-0 left-0 z-[100] bg-white py-2 shadow-xl md:hidden">
      <div className="flex w-full flex-row-reverse items-center justify-evenly">
        {user && !isLoading ? (
          <NavLink
            to={`/account`}
            className={({ isActive }) =>
              `text-grey-500 relative flex flex-col items-center gap-1 py-2 ${isActive ? "text-primary before:bg-primary before:h-1 before:w-full before:rounded-b-2xl before:transition-all before:duration-300" : "text-black"}`
            }
          >
            <User size={30} />
            <span className="text-xs font-medium">پروفایل</span>
          </NavLink>
        ) : (
          <Modal>
            <Modal.Open open="login">
              <div className="text-grey-500 relative flex flex-col items-center gap-1 py-2">
                <User size={30} />
                <span className="text-200 font-medium">ورود</span>
              </div>
            </Modal.Open>

            <Modal.Window name="login">
              <Login />
            </Modal.Window>
          </Modal>
        )}

        {links.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            className={({ isActive }) =>
              `text-grey-500 relative flex flex-col items-center gap-1 py-2 ${isActive ? "text-primary before:bg-primary before:h-1 before:w-full before:rounded-b-2xl before:transition-all before:duration-300" : "text-black"}`
            }
          >
            <link.icon size={30} />
            <span className="text-200 font-medium">{link.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default MenuMobile;
