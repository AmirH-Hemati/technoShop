import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

import { More } from "iconsax-reactjs";

import { useOutsideClick } from "../utils/useOutsideClick";

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const close = () => setOpenId("");
  const open = setOpenId;
  return (
    <MenusContext.Provider
      value={{ openId, close, open, setPosition, position }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <div className="flex items-center justify-end">{children}</div>;
}
function Toggle({ id }) {
  const { openId, open, close, setPosition } = useContext(MenusContext);
  function handelClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }
  return (
    <button
      onClick={handelClick}
      className="hover:bg-grey-100 cursor-pointer rounded-sm border-none bg-none p-2 transition-all duration-300"
    >
      <More size="26" className="text-grey-700" />
    </button>
  );
}
function List({ children, id }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close);
  if (openId !== id) return null;
  return createPortal(
    <ul
      ref={ref}
      className="bg-grey-0 divide-grey-100 fixed divide-y rounded-md shadow-sm"
      style={{ top: position.y, right: position.x }}
    >
      {children}
    </ul>,
    document.body,
  );
}
function Button({ children, onClick, icon }) {
  const { close } = useContext(MenusContext);

  function handelClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        onClick={handelClick}
        className="hover:bg-grey-50 flex w-full cursor-pointer items-center gap-2 bg-none px-5 py-4 text-left text-sm"
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
