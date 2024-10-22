"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Login from "@/app/components/ui/forms/auth/Login";
import { ToastProvider} from "react-toast-notifications";
const page = () => {
  return (
    <ToastProvider placement="top-right" autoDismiss={true}>
      <section className="font-Grosteque px-3 md:px-12 py-5">
        <nav className=" flex justify-between items-center">
          <div className="logo">
            <span className="text-black font-extrabold text-5xl">
              <Link legacyBehavior href="/">Q.</Link>
            </span>
          </div>
          <div className="flex justify-center items-center gap-6">
            <h6 className="text-black font-light hover:underline">
              <Link href="/supportroom">Support</Link>
            </h6>
            <button className="bg-lime-200 p-3 rounded-md font-medium text-sm hover:scale-105 transition ease-in-out">
              <Link href="/auth/signup">Create An Account</Link>
            </button>
          </div>
        </nav>
        <section className="flex flex-col justify-center items-center h-auto gap-4 mt-16">
          <div className="text-center">
            <h1 className="font-bold text-black text-[1.75rem]">
              Welcome back, customer support genius
            </h1>
            <p className="font-normal text-md text-black">
              Let&apos;s get you back to assisting customers. Log in to continue.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <Login />
          </div>
          <div className="flex justify-center items-center gap-2">
            <hr className="w-16" />
            <span className="text-gray-300">or</span>
            <hr className="w-16" />
          </div>
          <div className="w-full md:w-1/2">
            <button
              type="submit"
              className=" flex justify-center items-center gap-3 mt-4 w-full px-6 py-3 bg-gray-200 text-black font-medium rounded-md"
            >
              <Image src="/google.svg" width={20} height={50} alt="Google" />
              Sign Up With Google
            </button>
          </div>
        </section>
      </section>
      </ToastProvider>
  );
};

export default page;
