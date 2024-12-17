import React from "react";
import imgLastOption from "@/public/images/last-option.avif";
const LastOption = () => {
  return (
    <div className="lg:my-10 lg:p-10 flex flex-col lg:flex-row justify-center lg:justify-start items-center h-auto lg:h-screen">
      <div className="w-full h-auto lg:w-[686px] lg:h-[480px] p-20 bg-blue-700 flex justify-center items-center ">
        <p className="text-black text-4xl lg:text-6xl">
          Get started with <span className="text-white">ExpenseEye</span>. Fast,
          secure and flexible.
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
