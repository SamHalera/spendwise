import React from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-purple py-6 px-10 flex flex-col gap-8 justify-center items-center">
      <div className="flex flex-col gap-6 md:gap-3 md:flex-row justify-between items-center w-full">
        <div className="flex-1">
          <img src="/images/logo-dark.svg" alt="Spendwise" className="h-10" />
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
            Suivez vos dépenses avec Spendwise
          </h2>
        </div>
      </div>
      <span className="block text-white">© {new Date().getFullYear()} Spendwise</span>
    </footer>
  );
};

export default Footer;
