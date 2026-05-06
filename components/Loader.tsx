import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-start justify-center">
      <div className="flex justify-center items-center gap-2 my-40">
        <span className="loading loading-ring loading-lg text-emerald-600"></span>
      </div>
    </div>
  );
};

export default Loader;
