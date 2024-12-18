import React from "react";
import OptionItem from "./OptionItem";
import { homeOptions } from "@/assets/homepage-options";

const OptionsSection = () => {
  return (
    <div className="lg:py-10 flex flex-col items-center lg:items-start relative lg:my-10">
      <div className="bg-white text-center lg:text-start lg:absolute p-8 rounded-md left-5 -top-6 lg:w-2/3">
        <h2 className="text-4xl lg:text-6xl text-indigo-600 font-thin">
          All options in one central platform.
        </h2>
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
