"use client";
import React, { useState } from "react";
import { BookmarkCheck, ChartNetwork, LucideProps } from "lucide-react";
import FeaturesSectionTitle from "./FeaturesSectionTitle";
import { useInView, InView } from "react-intersection-observer";
import clsx from "clsx";

import iphoneUI from "@/public/images/iphoneUI.png";
import uiTable from "@/public/images/uiTable.png";

type LabelProps = {
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

const items = [
  {
    label: "expenses",
    imageSrc: iphoneUI.src,
  },
  {
    label: "monitoring",
    imageSrc: uiTable.src,
  },
];
const itemsLabel = [
  {
    label: "Easily submit expenses",
    boundTo: "expenses",
    icon: BookmarkCheck,
  },
  {
    label: " A clear transactions monitoring",
    boundTo: "monitoring",
    icon: ChartNetwork,
  },
];
const FeaturesSections = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const [visibleSection, setVisibleSection] = useState(items[0].label);

  const setInView = (inView: any, entry: any) => {
    if (inView) {
      setVisibleSection(entry.target.getAttribute("id"));
    }
  };
  return (
    <div className="p-9 min-h-screen flex flex-col gap-10 my-10">
      <FeaturesSectionTitle />
      <div
        ref={ref}
        className="flex flex-col lg:flex-row-reverse justify-center relative gap-4"
      >
        <div className="flex-1">
          <div className="lg:w-2/3  lg:sticky top-48 bottom-10 mx-auto flex flex-col gap-10">
            <h3 className="text-2xl lg:text-3xl font-thin text-center lg:text-start">
              Manage all your expenses on our platform – from travel expense
              reports to out-of-pocket reimbursements and credit card
              transactions.
            </h3>
            <div className="hidden lg:block">
              {itemsLabel.map((item) => {
                return (
                  <div
                    className={clsx(" gap-4 items-center duration-500", {
                      "flex translate-y-4": visibleSection === item.boundTo,
                      "hidden translate-y-0": visibleSection !== item.boundTo,
                    })}
                    key={item.label}
                  >
                    <item.icon size={40} className="text-blue-500" />
                    <span className="text-blue-500 text-2xl">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-20 flex-1 items-center">
          <InView onChange={setInView} threshold={0.5} id="expenses">
            <img src={iphoneUI.src} alt="" className="" />
          </InView>
          <InView onChange={setInView} threshold={0.5} id="monitoring">
            <div
              ref={ref}
              className="w-[300px] h-[330px] lg:w-[650px] lg:h-[630px] bg-slate-50 rounded-lg relative flex justify-center mb-28 shadow-md"
            >
              <img src={uiTable.src} alt="" className="" />
            </div>
          </InView>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSections;
