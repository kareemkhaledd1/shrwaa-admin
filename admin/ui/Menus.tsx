"use client";

import { createContext, useContext, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const MenusContext = createContext({
  openId: "",
  closeMenu: () => {},
  openMenu: (_id: string) => {},
});

function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState("");

  const closeMenu = () => setOpenId("");
  const openMenu = setOpenId;

  return (
    <MenusContext.Provider value={{ openId, closeMenu, openMenu }}>
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-end relative">{children}</div>
  );
}

function Toggle({ id }: { id: string }) {
  const { openId, openMenu, closeMenu } = useContext(MenusContext);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    openId === "" || openId !== id ? openMenu(id) : closeMenu();
  }

  return (
    <button
      className="p-[0.4rem] rounded-md translate-x-[0.8rem] transition-all duration-200 hover:bg-gray-100"
      onClick={handleClick}
    >
      <HiDotsVertical className="w-6 h-6 text-gray-400 transition-all duration-150" />
    </button>
  );
}

function List({ id, children }: { id: string; children: React.ReactNode }) {
  const { openId, closeMenu } = useContext(MenusContext);
  const ref = useOutsideClick<HTMLUListElement>(closeMenu, false);

  if (openId !== id) return null;

  return (
    <ul
      className="absolute bg-white shadow-md rounded-md right-1 top-8 z-50"
      ref={ref}
    >
      {children}
    </ul>
  );
}

function Button({
  children,
  onClick,
  icon,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}) {
  const { closeMenu } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    closeMenu();
  };

  return (
    <li>
      <button
        onClick={handleClick}
        disabled={disabled}
        className="w-full py-2 px-4 text-sm hover:bg-gray-100 transition-all duration-200 flex items-center justify-start gap-2"
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
