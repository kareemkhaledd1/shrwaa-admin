"use client";

import Link from "next/link";
import {
  HiOutlineArchiveBox,
  HiOutlineHome,
  HiOutlineTag,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { usePathname } from "next/navigation";
import { HiOutlineDeviceMobile } from "react-icons/hi";

function NavList() {
  const pathname = usePathname();
  return (
    <ul className="space-y-5 mt-10">
      <li>
        <Link
          className={`aside-link group ${pathname === "/" ? "bg-orange-50 text-slate-700" : ""}`}
          href={"/"}
        >
          <HiOutlineHome
            className={`text-3xl text-gray-200 group-hover:text-orange-500 ${pathname === "/" ? "text-orange-500" : ""}`}
          />
          <span>Home</span>
        </Link>
      </li>
      <li className="">
        <Link
          className={`aside-link group ${pathname.startsWith("/brands") ? "bg-orange-50 text-slate-700" : ""}`}
          href={"/brands"}
        >
          <HiOutlineTag
            className={`text-3xl text-gray-200 group-hover:text-orange-500 ${pathname.startsWith("/brands") ? "text-orange-500" : ""}`}
          />
          Brands
        </Link>
      </li>
      <li>
        <Link
          className={`aside-link group ${pathname.startsWith("/phones") ? "bg-orange-50 text-slate-700" : ""}`}
          href={"/phones"}
        >
          <HiOutlineDeviceMobile
            className={`text-3xl text-gray-200 group-hover:text-orange-500 ${pathname.startsWith("/phones") ? "text-orange-500" : ""}`}
          />
          <span>Phones</span>
        </Link>
      </li>
      <li>
        <Link
          className={`aside-link group ${pathname.startsWith("/orders") ? "bg-orange-50 text-slate-700" : ""}`}
          href={"/orders"}
        >
          <HiOutlineArchiveBox
            className={`text-3xl text-gray-200 group-hover:text-orange-500 ${pathname.startsWith("/orders") ? "text-orange-500" : ""}`}
          />
          <span>Orders</span>
        </Link>
      </li>
      <li>
        <Link
          className={`aside-link group ${pathname.startsWith("/users") ? "bg-orange-50 text-slate-700" : ""}`}
          href={"/users"}
        >
          <HiOutlineUserGroup
            className={`text-3xl text-gray-200 group-hover:text-orange-500 ${pathname.startsWith("/users") ? "text-orange-500" : ""}`}
          />
          <span>Users</span>
        </Link>
      </li>
    </ul>
  );
}

export default NavList;
