"use client";
import React from "react";

import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-primary shadow-lg border-slate-300 h-auto p-3 flex justify-between items-center fixed w-full z-50">
      <Link href={"/"}>
        <img src="/images/logo-white-bg.svg" alt="Spendwise" className="h-10" />
      </Link>

      <div className="flex gap-6">
        <Link
          className="rounded-md px-4 py-2 text-white font-semibold border border-secondary hover:bg-secondary duration-500 "
          href={"/signup"}
        >
          signup
        </Link>
        <Link
          className="border border-secondary rounded-md px-4 py-2 bg-secondary hover:bg-transparent  font-semibold duration-500 text-white"
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
