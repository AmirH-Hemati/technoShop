import { Call, Category, Home, ShoppingCart, User } from "iconsax-reactjs";
import { NavLink } from "react-router-dom";
import Modal from "./Modal.js";
import Login from "../features/authentication/Login.js";
import { useUser } from "../features/authentication/useUser.js";

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
              <NavLink
                className={({ isActive }) =>
                  `text-grey-500 relative flex flex-col items-center gap-1 py-2`
                }
              >
                <User size={30} />
                <span className="text-xs font-medium">ورود</span>
              </NavLink>
            </Modal.Open>

            <Modal.Window name="login">
              <Login />
            </Modal.Window>
          </Modal>
        )}

        <NavLink
          to={`/ContactUs`}
          className={({ isActive }) =>
            `text-grey-500 relative flex flex-col items-center gap-1 py-2 ${isActive ? "text-primary before:bg-primary before:h-1 before:w-full before:rounded-b-2xl before:transition-all before:duration-300" : "text-black"}`
          }
        >
          <Call size={30} />
          <span className="text-xs font-medium">ارتباط با ما</span>
        </NavLink>
        <NavLink
          to={`/cart`}
          className={({ isActive }) =>
            `text-grey-500 relative flex flex-col items-center gap-1 py-2 ${isActive ? "text-primary before:bg-primary before:h-1 before:w-full before:rounded-b-2xl before:transition-all before:duration-300" : "text-black"}`
          }
        >
          <ShoppingCart size={30} />
          <span className="text-xs font-medium">سبد خرید</span>
        </NavLink>
        <NavLink
          to={`products`}
          className={({ isActive }) =>
            `text-grey-500 relative flex flex-col items-center gap-1 py-2 ${isActive ? "text-primary before:bg-primary before:h-1 before:w-full before:rounded-b-2xl before:transition-all before:duration-300" : "text-black"}`
          }
        >
          <Category size={30} />
          <span className="text-xs font-medium">دسته بندی</span>
        </NavLink>
        <NavLink
          to={`/`}
          className={({ isActive }) =>
            `text-grey-500 relative flex flex-col items-center gap-1 py-2 ${isActive ? "text-primary before:bg-primary before:h-1 before:w-full before:rounded-b-2xl before:transition-all before:duration-300" : "text-black"}`
          }
        >
          <Home size={30} />
          <span className="text-xs font-medium">خانه</span>
        </NavLink>
      </div>
    </div>
  );
}

export default MenuMobile;
