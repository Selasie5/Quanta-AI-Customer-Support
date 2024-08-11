import React from "react";
import Link from "next/link";
import Image from "next/image";
import Signup from "@/app/components/ui/forms/auth/Signup";

const page = () => {
  return (
    <>
      <section className="font-Grosteque px-4 md:px-12 py-5">
        <nav className=" flex justify-between items-center">
          <div className="logo">
            
              <span className="text-black font-extrabold text-5xl">
                <Link href="/">Q.</Link>
              </span>
          </div>
          <div className="flex justify-center items-center gap-6">
            <h6 className="text-black font-light hover:underline">
              <Link href="/">Support</Link>
            </h6>
            <button className="bg-lime-200 p-3 rounded-md font-medium text-sm hover:scale-105 transition ease-in-out">
              <Link href="/auth/login">Login to account</Link>
            </button>
          </div>
        </nav>
        <section className="flex flex-col justify-center items-center h-auto gap-4 mt-16">
          <div className="text-center">
            <h1 className="font-bold text-black text-[1.75rem]">
              Ready to revolutionize your customer support
            </h1>
            <p className="font-normal text-md text-black">
              Create an account and revolutionize customer support with AI.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <Signup />
          </div>
         
        </section>
      </section>
    </>
  );
};

export default page;
