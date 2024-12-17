import React from "react";
import heroImg from "@/public/images/hero-img.png";
import Link from "next/link";
import { HandCoins, Laptop, PieChart } from "lucide-react";

const Hero = () => {
  return (
    <div
      className="h-auto md:h-screen  bg-scroll lg:bg-fixed my-20"
      style={{
        backgroundImage: `url(${heroImg.src})`,
        backgroundRepeat: "no-repeat",

        backgroundSize: "cover",
      }}
    >
      <div className="bg-gradient-to-b from-blue-950/50 via-blue-800/60 to-indigo-800/80 h-auto md:h-screen flex flex-col justify-center gap-20 items-center relative px-4 py-6">
        <div className="flex flex-col gap-4 w-2/3 text-center">
          <h1 className="text-white text-4xl lg:text-6xl xl:text-7xl font-thin">
            Leading expenses management platform
          </h1>
          <Link
            className="self-center bg-blue-700 py-4 px-10 rounded-md text-white text-xl hover:bg-blue-500 duration-500"
            href={"/dashboard"}
          >
            try it!
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="bg-white/20 p-10 flex flex-col gap-4 items-center justify-center rounded-lg md:w-60 lg:w-72 xl:w-96 text-center ">
            <Laptop size={50} className="text-white" />
            <span className="text-2xl font-thin text-white">
              Modern, intuitive user experience
            </span>
          </div>
          <div className="bg-white/20 p-10 flex flex-col gap-4 items-center justify-center rounded-lg md:w-60 lg:w-72 xl:w-96 text-center ">
            <HandCoins size={50} className="text-white" />
            <span className="text-2xl font-thin text-white">Easy to use</span>
          </div>
          <div className="bg-white/20 p-10 flex flex-col gap-4 items-center justify-center rounded-lg md:w-60 lg:w-72 xl:w-96 text-center ">
            <PieChart size={50} className="text-white" />
            <span className="text-2xl font-thin text-white">
              Keep track of your finances the easy way
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
