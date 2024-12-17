import React from "react";
import logo from "@/public/images/logo.png";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-blue-500 py-6 px-10 flex flex-col gap-8 justify-center items-center">
      <div className="flex flex-col gap-6 md:gap-3 md:flex-row justify-between items-center w-full">
        <div className="flex-1">
          <img src={logo.src} alt="" className="w-20" />
        </div>
        {/* <div className="flex flex-col gap-3">
        </div> */}
        <div className="flex gap-3 justify-center flex-1">
          <Link className="text-white" href={"https://www.linkedin.com/feed/"}>
            <Linkedin />
          </Link>
          <Link className="text-white" href={"https://www.instagram.com/"}>
            <Instagram />
          </Link>
          <Link className="text-white" href={"https://www.facebook.com/"}>
            <Facebook />
          </Link>
        </div>
        <div className="flex justify-center flex-1">
          <h2 className="text-white text-2xl md:w-72 text-center md:text-start">
            Monitor your expenses with ExpenseEye
          </h2>
        </div>
      </div>
      <span className="block text-white">© 2024 ExpenseEye</span>
    </footer>
  );
};

export default Footer;
