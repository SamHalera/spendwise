import React from "react";
import heroImg from "@/public/images/hero-img.png";
import Link from "next/link";
import { HandCoins, Laptop, PieChart } from "lucide-react";

const Hero = () => {
  return (
    <div
      className="h-auto md:h-screen  bg-scroll lg:bg-fixed"
      style={{
        backgroundImage: `url(${heroImg.src})`,
        backgroundRepeat: "no-repeat",

        backgroundSize: "cover",
      }}
    >
      <div className=" bg-gradient-purple h-auto md:h-screen flex flex-col justify-center gap-20 items-center relative px-4 py-6">
        <div className="flex flex-col gap-4 w-2/3 text-center">
          <h1 className="text-white text-4xl lg:text-6xl xl:text-7xl font-thin">
            La plateforme de gestion des dépenses de référence
          </h1>
          <Link
            className="self-center py-4 px-10 rounded-md text-white text-xl border border-secondary bg-secondary hover:bg-transparent hover:border-secondary duration-500"
            href={"/dashboard"}
          >
            Essayer !
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="bg-white/20 p-10 flex flex-col gap-4 items-center justify-center rounded-lg md:w-60 lg:w-72 xl:w-96 text-center ">
            <Laptop size={50} className="text-white" />
            <span className="text-2xl font-thin text-white">
              Expérience utilisateur moderne et intuitive
            </span>
          </div>
          <div className="bg-white/20 p-10 flex flex-col gap-4 items-center justify-center rounded-lg md:w-60 lg:w-72 xl:w-96 text-center ">
            <HandCoins size={50} className="text-white" />
            <span className="text-2xl font-thin text-white">Facile à utiliser</span>
          </div>
          <div className="bg-white/20 p-10 flex flex-col gap-4 items-center justify-center rounded-lg md:w-60 lg:w-72 xl:w-96 text-center ">
            <PieChart size={50} className="text-white" />
            <span className="text-2xl font-thin text-white">
              Suivez vos finances simplement
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
