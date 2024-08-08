"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FeaturesCard from "./components/ui/landing-page/FeaturesCard";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(null); // State to hold button's x-position
  const buttonRef = useRef(null); // Reference for the sandwich button

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

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition(rect.left); // Capture the x-position of the button
    }
  }, [menuOpen]); // Run this whenever `menuOpen` changes

  return (
    <main className="font-Grosteque h-fit bg-black relative">
      <div className="bg-lime-200 h-12 flex justify-center items-center">
        <h6 className="font-Manrope font-medium text-black">
          This application was built by a team of experienced developers.
          <span className="underline font-bold">Hire us</span>
        </h6>
      </div>
      <section className="px-12 py-5 data-scroll-section">
        <nav className="flex justify-between items-center">
          <div className="logo">
            <span className="text-lime-200 font-extrabold text-4xl">Q.</span>
          </div>
          <div className="md:hidden z-50">
            <button
              ref={buttonRef} // Attach ref to the sandwich button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`text-white focus:outline-none z-50 transition-transform duration-300 ease-in-out ${
                menuOpen ? "transform scale-0" : "transform scale-100"
              }`}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex justify-center items-center gap-10">
            <h6 className="text-white font-light hover:underline">
              <Link href="">Features</Link>
            </h6>
            <h6 className="text-white font-light hover:underline">
              <Link href="">Meet Our Team</Link>
            </h6>
            <h6 className="text-white font-light hover:underline">
              <Link href="">The Building Process</Link>
            </h6>
            <h6 className="text-white font-light hover:underline">
              <Link href="">Support</Link>
            </h6>
            <div className="flex justify-center items-center gap-6">
              <button className="bg-white p-3 rounded-md font-medium text-sm hover:scale-105 transition ease-in-out">
                <Link href="/auth/signup">Get Started</Link>
              </button>
              <button className="bg-lime-200 p-3 rounded-md font-medium text-sm hover:scale-105 transition ease-in-out">
                <Link href="/auth/login">Login to account</Link>
              </button>
            </div>
          </div>
        </nav>

        {/* Translucent Overlay and Menu */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center gap-8 z-40">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 text-white z-50 transition-transform duration-300 ease-in-out"
              style={{ left: buttonPosition }} // Align with sandwich button's x-position
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            
            <h6 className="text-white text-2xl font-light hover:underline">
              <Link href="" onClick={() => setMenuOpen(false)}>
                Features
              </Link>
            </h6>
            <h6 className="text-white text-2xl font-light hover:underline">
              <Link href="" onClick={() => setMenuOpen(false)}>
                Meet Our Team
              </Link>
            </h6>
            <h6 className="text-white text-2xl font-light hover:underline">
              <Link href="" onClick={() => setMenuOpen(false)}>
                The Building Process
              </Link>
            </h6>
            <h6 className="text-white text-2xl font-light hover:underline">
              <Link href="" onClick={() => setMenuOpen(false)}>
                Support
              </Link>
            </h6>
            <button className="bg-white p-3 rounded-md font-medium text-sm hover:scale-105 transition ease-in-out">
              <Link href="/auth/signup" onClick={() => setMenuOpen(false)}>Get Started</Link>
            </button>
            <button className="bg-lime-200 p-3 rounded-md font-medium text-sm hover:scale-105 transition ease-in-out">
              <Link href="/auth/login" onClick={() => setMenuOpen(false)}>Login to account</Link>
            </button>
          </div>
        )}
      </section>
      

      

      <section className="flex flex-col justify-center items-center mt-[7.5rem]">
         <h1 className="text-white font-extrabold text-[4rem] leading-tight text-center">Experience the future of customer support with <span className="text-lime-200">Quanta .</span></h1>
         <p className="text-white font-light text-md w-2/3 text-center">Our AI-driven platform delivers instant, accurate, and personalized responses to your customers, ensuring unparalleled satisfaction and efficiency. </p>
         <div className="py-3">
         <button className="font-semibold bg-lime-200 text-sm request-button">Watch A Demo</button>
         </div>
         <div className="relative w-full h-[350px] mt-10">
    <Image
        src="/hero-3.jpg"
        layout="fill"
        objectFit="cover"  // Use "cover" to fill the container while preserving aspect ratio
        alt="Hero-images"
        className="rounded-md grayscale-0 shadow-sm"
    />
</div>
      </section>
      <section className="px-12 py-5 flex justify-center items-center gap-28 mt-28">
    <div className="w-2/5 space-y-2">
  <h4 className="font-light text-lg text-white">Why Choose Quanta?</h4>
  <h5 className="font-medium text-5xl text-lime-200">Efficient support, anytime anywhere</h5>
  <p className="font-Manrope text-white text-md font-light">Quanta is your intelligent customer support solution, designed to provide seamless assistance to your customers 24/7. With cutting-edge AI technology and advanced deployment on AWS, Quanta ensures your customers receive accurate and prompt responses, enhancing their experience and satisfaction.</p>
     </div>
     <div className="w-3/5 flex justify-center items-start gap-4 flex-wrap">
<FeaturesCard feature="Advanced AI Integration" bgColor="bg-red-200" textColor="text-red-500" shadowColor="shadow-red-300"/>
<FeaturesCard feature="Robust Infrastructure" bgColor="bg-green-200" textColor="text-green-500" shadowColor="shadow-green-300"/>
<FeaturesCard feature="Enhanced User Experience" bgColor="bg-blue-200" textColor="text-blue-500" shadowColor="shadow-blue-300"/>
<FeaturesCard feature="Intelligent Chatbot" bgColor="bg-purple-200" textColor="text-purple-500" shadowColor="shadow-purple-300"/>v
<FeaturesCard feature="Advanced Analytics" bgColor="bg-orange-200" textColor="text-orange-500" shadowColor="shadow-orange-300"/>v
<FeaturesCard feature="Intelligent Chatbot" bgColor="bg-purple-200" textColor="text-purple-500" shadowColor="shadow-purple-300"/>v
     </div>
      </section>
      <section id="team" className="flex justify-center items-center">
        <h2>Meet Our Team</h2>

      </section>
    </main>
  );
}

      

        