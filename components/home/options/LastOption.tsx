import React from "react";
import imgLastOption from "@/public/images/last-option.png";
const LastOption = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center w-full px-10">
      <div className="h-auto flex flex-col gap-5  ">
        <p className="text-secondary text-5xl">
          Commencez avec <span className="">SpendWise</span>.
        </p>
        <p className="text-secondary text-5xl"> Rapide,sécurisé et flexible.</p>
        <p className="text-secondary text-2xl">
          Aucune connexion bancaire. Aucun tracker. Vos données ne quittent jamais votre compte.
        </p>
      </div>

      <div className="">
        <img
          src={imgLastOption.src}
          alt=""
          className=" object-cover"
        />
      </div>
    </div>
  );
};

export default LastOption;
