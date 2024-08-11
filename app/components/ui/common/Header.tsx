"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<number | null>(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      const rect = (buttonRef.current as HTMLButtonElement).getBoundingClientRect();
      setButtonPosition(rect.left);
    }
  }, [menuOpen]);

  return (
    <section className="px-12 py-5 data-scroll-section">
      <nav className="flex justify-between items-center">
        <div className="logo">
          <span className="text-lime-200 font-extrabold text-4xl">
            <Link legacyBehavior href="/">Q.</Link>
          </span>

        </div>
        <div className="md:hidden z-50">
          <button
            ref={buttonRef}
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

            <Link legacyBehavior href="#features">
              <a>Features</a>
            </Link>
          </h6>
          <h6 className="text-white font-light hover:underline">
            <Link legacyBehavior href="#team">
              <a>Meet Our Team</a>
            </Link>
          </h6>
          <h6 className="text-white font-light hover:underline">
            <Link legacyBehavior href="#technologies">
              <a>Technologies</a>
            </Link>
          </h6>
          <h6 className="text-white font-light hover:underline">
            <Link legacyBehavior href="/supportroom">
              <a>Support</a>

            </Link>
          </h6>
          <div className="flex justify-center items-center gap-6">
            <button className="bg-white p-3 rounded-md font-medium text-sm hover:scale-105 transition ease-in-out">

              <Link legacyBehavior href="/auth/signup">
                <a>Get Started</a>
              </Link>
            </button>
            <button className="bg-lime-200 p-3 rounded-md font-medium text-sm hover:scale-105 transition ease-in-out">
              <Link legacyBehavior href="/auth/login">
                <a>Login to account</a>

              </Link>
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center gap-8 z-40">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 text-white z-50 transition-transform duration-300 ease-in-out p-5"
            style={{ left: buttonPosition ?? undefined }}
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
            <Link legacyBehavior href="#features" onClick={() => setMenuOpen(false)}>
              <a>Features</a>
            </Link>
          </h6>
          <h6 className="text-white text-2xl font-light hover:underline">
            <Link legacyBehavior href="#team" onClick={() => setMenuOpen(false)}>
              <a>Meet Our Team</a>
            </Link>
          </h6>
          <h6 className="text-white text-2xl font-light hover:underline">
            <Link legacyBehavior href="#technologies" onClick={() => setMenuOpen(false)}>
              <a>Technologies</a>
            </Link>
          </h6>
          <h6 className="text-white text-2xl font-light hover:underline">
            <Link legacyBehavior href="/supportroom" onClick={() => setMenuOpen(false)}>
              <a>Support</a>
            </Link>
          </h6>
          <button className="bg-white p-3 rounded-md font-medium text-sm hover:scale-105 transition ease-in-out">
            <Link legacyBehavior href="/auth/signup" onClick={() => setMenuOpen(false)}>
              <a>Get Started</a>
            </Link>
          </button>
          <button className="bg-lime-200 p-3 rounded-md font-medium text-sm hover:scale-105 transition ease-in-out">
            <Link legacyBehavior href="/auth/login" onClick={() => setMenuOpen(false)}>
              <a>Login to account</a>
            </Link>
          </button>
        </div>
      )}
    </section>
  );
}