import React from "react";
import lapTopImg1 from "@/public/images/tela.png";
import lapTopImg2 from "@/public/images/carcaca.png";
import ipadImg from "@/public/images/ipad.png";
import iphoneImg from "@/public/images/iphone.png";
import mockup from "@/public/images/mockup.png";
const MockupSection = () => {
  return (
    <div className="bg-white flex justify-center items-center py-32 h-screen">
      <img src={mockup.src} alt="" className=" block" />
    </div>
  );
};

export default MockupSection;
