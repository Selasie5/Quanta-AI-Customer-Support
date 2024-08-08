// page.tsx
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FeaturesCard from "./components/ui/landing-page/FeaturesCard";
import Header from "./components/ui/common/Header"; // Import the new Header component

export default function Home() {
  const TeamMember = [
    {
      id: 1,
      name: "Selasie Sepenu",
      role: "AI Software Engineer",
      linkedin: "",
      github: "",
    },
    {
      id: 2,
      name: "Faisal Mawujar",
      role: "AI Software Engineer",
      linkedin: "",
      github: "",
    },
    {
      id: 3,
      name: "Ariel Leistner",
      role: "AI Software Engineer",
      linkedin: "",
      github: "",
    },
  ];

  return (
    <main className="font-Grosteque h-fit bg-black relative">
      <div className="bg-lime-200 h-12 flex justify-center items-center">
        <h6 className="font-Manrope font-medium text-black">
          This application was built by a team of experienced developers.
          <span className="underline font-bold">Hire us</span>
        </h6>
      </div>
      <Header /> {/* Use the Header component */}
      <section className="flex flex-col justify-center items-center mt-[7.5rem]">
        <h1 className="text-white font-extrabold text-[4rem] leading-tight text-center">
          Experience the future of customer support with <span className="text-lime-200">Quanta .</span>
        </h1>
        <p className="text-white font-light text-md w-2/3 text-center">
          Our AI-driven platform delivers instant, accurate, and personalized responses to your customers, ensuring unparalleled satisfaction and efficiency.
        </p>
        <div className="py-3">
          <button className="font-semibold bg-lime-200 text-sm request-button">Watch A Demo</button>
        </div>
        <div className="relative w-full h-[350px] mt-10">
          <Image
            src="/hero-3.jpg"
            layout="fill"
            objectFit="cover"
            alt="Hero-images"
            className="rounded-md grayscale-0 shadow-sm"
          />
        </div>
      </section>
      <section className="px-12 py-5 flex justify-center items-center gap-28 mt-28">
        <div className="w-2/5 space-y-2">
          <h4 className="font-light text-lg text-white">Why Choose Quanta?</h4>
          <h5 className="font-medium text-5xl text-lime-200">Efficient support, anytime anywhere</h5>
          <p className="font-Manrope text-white text-md font-light">
            Quanta is your intelligent customer support solution, designed to provide seamless assistance to your customers 24/7. With cutting-edge AI technology and advanced deployment on AWS, Quanta ensures your customers receive accurate and prompt responses, enhancing their experience and satisfaction.
          </p>
        </div>
        <div className="w-3/5 flex justify-center items-start gap-4 flex-wrap">
          <FeaturesCard feature="Advanced AI Integration" bgColor="bg-red-200" textColor="text-red-500" shadowColor="shadow-red-300" />
          <FeaturesCard feature="Robust Infrastructure" bgColor="bg-green-200" textColor="text-green-500" shadowColor="shadow-green-300" />
          <FeaturesCard feature="Enhanced User Experience" bgColor="bg-blue-200" textColor="text-blue-500" shadowColor="shadow-blue-300" />
          <FeaturesCard feature="Intelligent Chatbot" bgColor="bg-purple-200" textColor="text-purple-500" shadowColor="shadow-purple-300" />
          <FeaturesCard feature="Advanced Analytics" bgColor="bg-orange-200" textColor="text-orange-500" shadowColor="shadow-orange-300" />
          <FeaturesCard feature="Intelligent Chatbot" bgColor="bg-purple-200" textColor="text-purple-500" shadowColor="shadow-purple-300" />
        </div>
      </section>
      <section id="team" className="flex justify-center items-center">
        <h2>Meet Our Team</h2>
      </section>
    </main>
  );
}