import BabySitterCard from "@/components/dashboard/baby-sitter/BabySitterCard";
import Calendar from "@/components/dashboard/baby-sitter/Calendar";

import React from "react";

const page = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h1 className="text-3xl text-blue-500 font-bold text-center my-6">
        Baby-sitter
      </h1>

      <BabySitterCard />

      <Calendar />
    </div>
  );
};

export default page;
