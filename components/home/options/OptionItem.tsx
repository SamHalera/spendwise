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
      className={clsx("px-10 h-screen w-full flex flex-col justify-end", {
        "bg-blue-600": index % 2 === 0,
        "bg-blue-800": index % 2 !== 0,
      })}
    >
      <div
        className={clsx("flex items-center justify-around", {
          "flex-row-reverse": index % 2 !== 0,
        })}
      >
        <div className="flex flex-col gap-5 text-white p-10 w-1/3">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="text-xl">{text}</p>
          <Link
            className="self-start bg-blue-700 py-4 px-10 rounded-md text-white text-xl hover:bg-blue-500 duration-500"
            href={"/dashboard"}
          >
            try it!
          </Link>
        </div>
        <img
          src={imgSrc}
          alt=""
          className="w-[300px] md:w-[500px] lg:w-[650px]"
        />
      </div>
    </div>
  );
};

export default OptionItem;
