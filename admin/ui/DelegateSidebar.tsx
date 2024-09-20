"use client";

import Link from "next/link";
import {
  HiOutlineArchiveBox,
  HiOutlineHome,
  HiOutlineTag,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { HiOutlineDeviceMobile } from "react-icons/hi";
import { usePathname } from "next/navigation";
import Image from "next/image";

function DelegateSidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-grey-0 p-8 border-r border-grey-100 row-span-full flex flex-col gap-8">
      <div className="pt-10 ">
        <div className="bg-orange-500 p-3 rounded-md">
          <Image
            src={"/shrwaa-logo-white.png"}
            alt={""}
            width={150}
            height={200}
          />
        </div>
      </div>
      <ul className="space-y-5 mt-10">
        <li>
          <Link
            className={`aside-link group ${pathname === "/delegate-dashboard" ? "bg-orange-50 text-slate-700" : ""}`}
            href={"/"}
          >
            <HiOutlineHome
              className={`text-3xl text-gray-200 group-hover:text-orange-500 ${pathname === "/delegate-dashboard" ? "text-orange-500" : ""}`}
            />
            <span>My orders</span>
          </Link>
        </li>
        <li className="">
          <Link
            className={`aside-link group ${pathname.startsWith("/history") ? "bg-orange-50 text-slate-700" : ""}`}
            href={"/brands"}
          >
            <HiOutlineTag
              className={`text-3xl text-gray-200 group-hover:text-orange-500 ${pathname.startsWith("/history") ? "text-orange-500" : ""}`}
            />
            History
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default DelegateSidebar;
