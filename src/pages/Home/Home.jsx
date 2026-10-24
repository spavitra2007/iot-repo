import React from "react";

import HeroSection from "../../components/About/HeroSection/HeroSection.jsx";
import WhoWeAre from "../../components/About/WhoWeAre/WhoWeAre.jsx";
import WhyTechnology from "../../components/About/WhyTechnology/WhyTechnology.jsx";
import LearningApproach from "../../components/About/LearningApproach/LearningApproach.jsx";
import Skill from "../../components/About/Skill/Skill.jsx";
import Teaching from "../../components/About/Teaching/Teaching.jsx";
import VisionMissionGoal from "../../components/About/VisionMissionGoal/VisionMissionGoal.jsx";

import "./Home.css";

export default function Home() {
  return (
    <main className="home-page">
      <HeroSection />

      <WhoWeAre />

      <WhyTechnology />

      <LearningApproach />

      <Skill />

      <Teaching />

      <VisionMissionGoal />
    </main>
  );
}