import clsx from "clsx";
import Link from "next/link";
import React from "react";

const OptionItem = ({
  title,
  text,
  imgSrc,
  index,
}: {
  title: string;
  text: string;
  imgSrc: string;
  index: number;
}) => {
  return (
    <div
      className={clsx("lg:px-10 h-screen w-full flex flex-col justify-end", {
        "bg-gradient-purple": index % 2 === 0,
        "bg-slate-200": index % 2 !== 0,
      })}
    >
      <div
        className={clsx(
          "flex flex-col lg:flex-row items-center justify-around",
          {
            "flex-row-reverse": index % 2 !== 0,
          }
        )}
      >
        <div className="flex flex-col gap-5 text-white p-10 lg:w-1/3">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="text-xl">{text}</p>
          <Link
            className="self-start py-4 px-10 rounded-md text-white text-xl border border-secondary bg-secondary hover:bg-transparent hover:border-secondary duration-500"
            href={"/dashboard"}
          >
            Essayer !
          </Link>
        </div>
        <img src={imgSrc} alt="" className="w-full md:w-[500px] lg:w-[650px]" />
      </div>
    </div>
  );
};

export default OptionItem;
