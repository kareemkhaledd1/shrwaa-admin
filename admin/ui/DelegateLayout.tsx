"use client";

import ProtectedRoute from "@/ui/ProtectedRoute";
import Sidebar from "@/ui/Sidebar";
import Image from "next/image";
import { HiArrowRightOnRectangle, HiOutlineUser } from "react-icons/hi2";
import { useUser } from "@/hooks/useUser";
import { useLogout } from "@/hooks/useLogout";
import { useRouter } from "next/navigation";
import DelegateSidebar from "@/ui/DelegateSidebar";

function DelegateLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const { logout } = useLogout();
  const router = useRouter();

  return (
    <div className="grid h-screen grid-cols-[20rem_1fr] grid-rows-[auto_1fr]">
      <header className="bg-white py-[1rem] px-[4.8rem] border-b border-gray-100">
        <div className="flex gap-6 justify-end items-center font-semibold text-lg text-gray-600">
          <Image
            src={user?.avatar || "/default-user.jpg"}
            alt={"Avatar"}
            width={40}
            height={36}
            className="rounded-full object-cover w-12 h-12"
          />
          <span>{user?.username}</span>
          <ul className="flex items-center gap-2">
            <li>
              <button
                className="py-1 rounded-md transition-all duration-200"
                onClick={() => logout()}
              >
                <HiArrowRightOnRectangle className="w-7 h-7 text-orange-500 hover:text-orange-400" />
              </button>
            </li>
          </ul>
        </div>
      </header>
      <DelegateSidebar />

      <main className="bg-gray-100 py-[4rem] px-[4.8rem] overflow-scroll">
        <div className="max-w-[70rem] mx-auto flex flex-col gap-[1rem]">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DelegateLayout;
