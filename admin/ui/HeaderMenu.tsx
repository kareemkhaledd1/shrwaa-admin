"use client";

import { HiArrowRightOnRectangle, HiOutlineUser } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/useLogout";

function HeaderMenu() {
  const router = useRouter();
  const { logout } = useLogout();

  return (
    <div>
      <ul className="flex items-center gap-2">
        <li>
          <button
            className=" py-1 rounded-md transition-all duration-200"
            onClick={() => router.push("/account")}
          >
            <HiOutlineUser className="w-6 h-6 text-orange-500 hover:text-orange-400" />
          </button>
        </li>
        <li>
          <button
            className="py-1 rounded-md transition-all duration-200"
            onClick={() => logout()}
          >
            <HiArrowRightOnRectangle className="w-6 h-6 text-orange-500 hover:text-orange-400" />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default HeaderMenu;
