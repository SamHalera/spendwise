import React from "react";
import Hero from "./Hero";
import MockupSection from "./MockupSection";
import FeaturesSections from "./features/FeaturesSections";
import Test from "./Test";
import OptionsSection from "./options/OptionsSection";
import LastOption from "./options/LastOption";

const HomeContent = () => {
  return (
    <>
      <Hero />
      <MockupSection />
      <FeaturesSections />
      <OptionsSection />
      <LastOption />
    </>
  );
};

export default HomeContent;
