"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FeaturesCard from "./components/ui/landing-page/FeaturesCard";
import Header from "./components/ui/common/Header"; // Import the new Header component
import TechStackCard from "./components/ui/landing-page/TechnologyCard";
import { 
  FaAws,
  FaGitAlt,
  FaGithub,
  FaTrello,
  FaRegEye
 } from "react-icons/fa6";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiFirebase,
  SiJest,
  SiFigma,
} from "react-icons/si";
import SupportForm from "./components/ui/forms/landing/SupportForm";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(null); // State to hold button's x-position
  const buttonRef = useRef(null); // Reference for the sandwich button

  const TeamMembers = [
    {
      id: 1,
      name: "Selasie Sepenu",
      image: "/avatar-7.png",
      role: " AI Software Engineer",
      experience:
        "Collaborating on this project was a fantastic experience. We turned challenges into opportunities and learned so much along the way.",
      linkedin: "",
      github: "",
    },
    {
      id: 2,
      name: "Faisal Mawujar",
      image: "/avatar-9.png",
      role: " AI Software Engineer",
      experience:
        "Being part of this project allowed me to push my limits and contribute to something truly innovative. It was a rewarding journey",
      linkedin: "",
      github: "",
    },
    {
      id: 3,
      name: "Ariel Leistner",
      image: "/avatar-8.png",
      role: " AI Software Engineer",
      experience:
        "This project brought out the best in all of us. The teamwork and synergy made it a memorable and successful experience.",
      linkedin: "",
      github: "",
    },
  ];

  return (
    <main className=" font-Grosteque h-fit bg-black">
      {/* Banner */}
      <div className="bg-lime-200 h-12 flex justify-center items-center">
        <h6 className="font-Manrope font-medium text-black">
          This application was built by a team of experienced developed.
          <span className="underline font-bold">Hire us</span>
        </h6>
      </div>
      <Header /> {/* Use the Header component */}
      <section className="px-12 py-5 flex flex-col justify-center items-center mt-[7.5rem]">
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
      
        

      {/* Meet Our Team Section */}
      <section
        id="team"
        className="px-5 md:px-12 py-5 flex flex-col justify-center items-center gap-5 mt-28"
      >
        <div className="space-y-2 flex flex-col justify-center items-center">
          <p className="text-lg text-white font-light">Team Quanta</p>
          <h2 className="font-medium text-5xl text-lime-200">Meet Our Team</h2>
          <p className=" text-white text-md font-light md:w-3/5 text-center">
            Over the period of 3 days, this amazing built this amazing
            application ensring best practices, performing code reviews and
            merging some pull requests.Yeah, we turned coffee into meanignful
            code.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-[6rem] mt-4 ">
          {TeamMembers.map((member, id) => (
            <div className="bg-lime-200 w-72 p-5 flex flex-col justify-center items-start gap-2 rounded-md hover:shadow-lg hover:scale-105 transition ease-in-out">
              <Image
                src={member.image}
                alt="team-member-img"
                width={70}
                height={50}
              />
              <h3 className="text-2xl font-semibold text-gray-600">
                {member.name}
              </h3>
              <p className="text-gray-400 uppercase text-sm">{member.role}</p>
              <p className="text-black  text-sm">{member.experience}</p>
              <div className="flex justify-center items-start gap-4 mt-3">
                <span className="hover:underline font-bold">
                  <Link href={member.github}>Github</Link>
                </span>
                <span> | </span>
                <span className="hover:underline font-bold">
                  <Link href={member.linkedin}>Linkedin</Link>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className=" px-5 md:px-12 py-5 flex flex-col md:flex-row justify-center items-center  gap-12 md:gap-36 mt-28">
        <div className="md:w-1/2 space-y-2 flex flex-col justify-center items-start">
          <p className="text-lg text-white font-light">Technologies</p>
          <h2 className="font-medium text-5xl text-lime-200">
            Behind The Magic
          </h2>
          <p className=" text-white text-md font-light md:w-3/5 ">
            We&apos;ve assembled a stellar lineup of tech to bring our vision to
            life. Here’s the secret sauce behind our project&apos;s success
          </p>
        </div>
        <div className="md:w-1/2 flex md:justify-center items-center gap-[2rem] flex-wrap">
          <TechStackCard
            language="Next JS"
            domain="frontend"
            icon={SiNextdotjs}
          />
          <TechStackCard
            language="Tailwind CSS"
            domain="frontend"
            icon={SiTailwindcss}
          />
          <TechStackCard
            language="Node.js"
            domain="backend"
            icon={SiNodedotjs}
          />
          <TechStackCard
            language="Mongo DB"
            domain="backend"
            icon={SiMongodb}
          />
          <TechStackCard
            language="Firebase"
            domain="backend"
            icon={SiFirebase}
          />
          <TechStackCard language="AWS" domain="frontend" icon={FaAws} />
          <TechStackCard
            language="Pinecone"
            domain="ML"
            icon={SiFirebase}
          />
          <TechStackCard
            language="Open AI"
            domain="ML"
            icon={SiFirebase}
          />
          <TechStackCard
            language="RAG"
            domain="ML"
            icon={SiFirebase}
          />
          <TechStackCard
            language="Git"
            domain="Version Control"
            icon={FaGitAlt}
          />
          <TechStackCard
            language="Github"
            domain="Version Control"
            icon={FaGithub}
          />
          <TechStackCard
            language="Trello"
            domain="Project Management"
            icon={FaTrello}
          />
        </div>
      </section>

      <section className=" flex flex-col justify-center items-center gap-3">
      <div className="px-5 space-y-2 flex flex-col justify-center items-center text-center mt-28">
          <p className="text-lg text-white font-light">Reach Out To Support</p>
          <h2 className="font-medium text-5xl text-lime-200">
            We&apos;re here to help
          </h2>
          <p className=" text-white text-md font-light md:w-3/5 ">
          Fill out the form below, and our support team will get back to you as soon as possible. Whether you have a question, need technical support, or just want to share your feedback, we're here to assist you every step of the way.
          </p>
        </div>
        <div>
          <SupportForm/>
        </div>
      </section>
      <footer className="px-12 py-5 flex justify-between items-center mt-28 pb-2">
        <div className="flex justify-center items-center gap-3 group border border-white rounded-md px-8 py-4">
        <FaRegEye size={14} className="hidden group-hover:block text-white transition ease-in-out" />
          <span className="text-white font-light hover:font-bold">
          View Project Github
          </span>
        </div>
        <div>
          <p>&copy;Copyright 2024. Team Quanta</p>
        </div>
        </footer>
    </main>
  );
}