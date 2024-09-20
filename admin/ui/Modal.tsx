"use client";

import {
  cloneElement,
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const ModalContext = createContext({
  open: (_name: string) => {},
  close: () => {},
  openName: "",
});

function Modal({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider
      value={{
        open,
        close,
        openName,
      }}
    >
      {" "}
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opens: opensWindowName,
}: {
  children: ReactElement;
  opens: string;
}) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }: { children: ReactElement; name: string }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick<HTMLDivElement>(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed top-0 right-0 w-full h-screen backdrop-blur z-50 transition-all duration-[0.5s]">
      <div
        className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white rounded-md shadow-md px-8 py-4 transition-all duration-[0.5s]"
        ref={ref}
      >
        <button
          className="p-2 rounded translate-x-1 absolute top-0 right-2 text-3xl"
          onClick={close}
        >
          <HiXMark />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
