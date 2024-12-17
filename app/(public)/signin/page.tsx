import LoginForm from "@/components/authForms/LoginForm";
import React, { Suspense } from "react";
import logoImg from "@/public/images/logo.png";

const page = () => {
  return (
    <div className="bg-gradient-to-b from-blue-950 via-blue-800 to-indigo-800 h-screen flex flex-col items-center justify-center w-full pt-10 px-4 mt-10">
      <h1 className="text-white text-4xl mb-4">Sign In</h1>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default page;
