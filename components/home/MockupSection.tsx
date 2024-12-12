import React from "react";
import lapTopImg1 from "@/public/images/tela.png";
import lapTopImg2 from "@/public/images/carcaca.png";
import ipadImg from "@/public/images/ipad.png";
import iphoneImg from "@/public/images/iphone.png";
const MockupSection = () => {
  return (
    <div className="bg-slate-200 relative py-32 h-screen">
      <div className="absolute left-80 w-fu">
        <img
          src={ipadImg.src}
          alt=""
          className="absolute -left-20 -bottom-24 max-w-full"
        />
        <div className="flex flex-col items-center justify-center ">
          <img src={lapTopImg1.src} alt="" className="w-full" />
          <img src={lapTopImg2.src} alt="" className="w-full" />
        </div>
        <img
          src={iphoneImg.src}
          alt=""
          className="absolute -right-10 bottom-0 max-w-full"
        />
      </div>
    </div>
  );
};

export default MockupSection;
