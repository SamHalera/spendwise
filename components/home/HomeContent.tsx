import React from "react";
import Hero from "./Hero";
import MockupSection from "./MockupSection";
import FeaturesSections from "./features/FeaturesSections";
import Test from "./Test";
import OptionsSection from "./options/OptionsSection";
import LastOption from "./options/LastOption";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";


const HomeContent = async () => {

  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="bg-slate-100">
      <Hero />
      {/* <MockupSection /> */}
      <FeaturesSections />
      <OptionsSection />
      <LastOption />
    </div>
  );
};

export default HomeContent;
