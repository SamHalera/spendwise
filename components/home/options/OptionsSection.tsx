import React from "react";
import OptionItem from "./OptionItem";
import { homeOptions } from "@/assets/homepage-options";

const OptionsSection = () => {
  return (
    <div className="lg:py-10 flex flex-col  lg:my-10">
      <div className="bg-gradient-purple p-8  flex flex-col items-center justify-center gap-4 h-80">
        <h2 className="text-5xl md:text-6xl text-white font-thin text-center">
          Cinq minutes pour configurer.
        </h2>
        <h3 className="text-3xl lg:text-5xl text-secondary">Plus jamais Excel.</h3>
      </div>
      {homeOptions.map((option, index) => {
        return (
          <OptionItem
            key={option.id}
            index={index}
            title={option.title}
            text={option.text}
            imgSrc={option.imgSrc}
          />
        );
      })}
    </div>
  );
};

export default OptionsSection;
