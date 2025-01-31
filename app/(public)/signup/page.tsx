import SignupForm from "@/components/authForms/SignupForm";
import React from "react";
import imageSignup from "@/public/images/image-signup.jpg";
import logoImg from "@/public/images/logo.png";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
const page = async () => {
  const session = await getServerSession(authOptions);
  console.log("session==>", session);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex h-auto lg:h-screen mt-20">
      <div
        className="hidden lg:block flex-1 h-screen"
        style={{
          backgroundImage: `url(${imageSignup.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 50%",
        }}
      >
        <div className="lg:h-screen  bg-gradient-to-b from-blue-950/80 via-blue-800/80 to-indigo-800/80 flex flex-col items-center justify-center p-4">
          <img src={logoImg.src} alt="" className="w-56" />
          <div>
            <h1 className="text-white text-6xl text-center">
              Leading expenses management platform
            </h1>
          </div>
        </div>
      </div>
      <SignupForm />
    </div>
  );
};

export default page;
