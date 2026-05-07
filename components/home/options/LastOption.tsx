import React from "react";
import imgLastOption from "@/public/images/last-option.png";
const LastOption = () => {
  return (
    <div className="lg:my-10 lg:p-10 flex flex-col lg:flex-row justify-center lg:justify-start items-center h-auto lg:h-screen">
      <div className="w-full h-auto lg:w-[686px] lg:h-[480px] p-20 bg-gradient-purple flex flex-col gap-5 justify-center items-center ">
        <p className="text-secondary text-4xl lg:text-6xl">
          Commencez avec <span className="text-white">SpendWise</span>. Rapide,
          sécurisé et flexible.
        </p>
        <p className="text-white text-2xl">
          Aucune connexion bancaire. Aucun tracker. Vos données ne quittent jamais votre compte.
        </p>
      </div>
      <div className="lg:w-[686px] lg:h-[480px] ">
        <img
          src={imgLastOption.src}
          alt=""
          className=" h-[480px] w-[686px] object-cover"
        />
      </div>
    </div>
  );
};

export default LastOption;
