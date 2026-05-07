import React from "react";
import heroImg from "@/public/images/hero-img.png";
import Link from "next/link";
import { Eye, HandCoins, Laptop, Lock, PieChart, Zap } from "lucide-react";

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
        <div className="flex flex-col gap-6 w-2/3 text-center">
          <h1 className="text-white text-4xl lg:text-6xl xl:text-7xl font-thin">
            Faites vos comptes. Simplement.
          </h1>
          <p className="text-white text-xl">L&rsquo;outil clair pour suivre vos dépenses et vos revenus, sans connexion bancaire ni automatisation. Comme votre vieux tableur Excel — en mille fois plus agréable.</p>
          <Link
            className="self-center py-4 px-10 rounded-md text-white text-xl border border-secondary bg-secondary hover:bg-transparent hover:border-secondary duration-500"
            href={"/dashboard"}
          >
            Essayez SpendWise!
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="bg-white/20 p-10 flex flex-col gap-4 items-center justify-center rounded-lg md:w-60 lg:w-72 xl:w-96 text-center ">
            <Lock size={50} className="text-white" />
            <span className="text-2xl font-thin text-white">
              Sans connexion bancaire
            </span>
            <span className="text-white">Vos données ne sortent jamais d&apos;ici. Aucun lien avec vos comptes.</span>
          </div>
          <div className="bg-white/20 p-10 flex flex-col gap-4 items-center justify-center rounded-lg md:w-60 lg:w-72 xl:w-96 text-center ">
            <Zap size={50} className="text-white" />
            <span className="text-2xl font-thin text-white">Plus simple qu&apos;un tableur</span>
            <span className="text-white">Une opération en deux clics. Aucune formule à maintenir.</span>
          </div>
          <div className="bg-white/20 p-10 flex flex-col gap-4 items-center justify-center rounded-lg md:w-60 lg:w-72 xl:w-96 text-center ">
            <Eye size={50} className="text-white" />
            <span className="text-2xl font-thin text-white">
              Tout en un coup d&apos;œil
            </span>
            <span className="text-white">Vue mensuelle, hebdomadaire, annuelle. Votre situation, toujours lisible.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
