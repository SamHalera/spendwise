"use client";
import React from "react";
import logoImg from "@/public/images/logo-white-bg.png";

import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-slate-300 h-auto p-3 flex justify-between items-center fixed w-full z-50">
      <Link href={"/"}>
        <img src={logoImg.src} alt="" className="w-14" />
      </Link>

      <div className="flex gap-6">
        <Link
          className="border border-blue-400 rounded-md px-4 py-2 text-blue-400 font-semibold duration-500 hover:bg-blue-400 hover:text-white"
          href={"/signup"}
        >
          signup
        </Link>
        <Link
          className="border border-blue-400 rounded-md px-4 py-2 bg-blue-400  font-semibold duration-500 hover:bg-transparent hover:text-blue-400 text-white"
          href={"/signin"}
        >
          login
        </Link>
      </div>

      {/* <Link
        className="flex justify-center items-center gap-1 text-blue-500 hover:text-blue-800 duration-500"
        href={"/dashboard"}
      >
        <LayoutDashboard /> Dashboard
      </Link> */}
    </header>
  );
};

export default Header;
