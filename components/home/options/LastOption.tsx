import React from "react";
import imgLastOption from "@/public/images/last-option.avif";
const LastOption = () => {
  return (
    <div className="my-10 p-10 flex justify-start items-center h-screen">
      <div className="w-[686px] h-[480px] p-20 bg-blue-700 flex justify-center items-center ">
        <p className="text-black text-6xl">
          Get started with <span className="text-white">ExpenseEye</span>. Fast,
          secure and flexible.
        </p>
      </div>
      <div className="w-[686px] h-[480px] ">
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
