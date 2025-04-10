'use client';
import Image from "next/image";
import React from "react";
import { LucideGithub, LucideUser } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="w-full flex sm:px-12 sm:pt-6 justify-between items-center mb-4 px-4 pt-4">
        {/* Logo */}
        <Link href="/">
        <div className="cursor-pointer flex items-center gap-2">
          <Image
            className="w-15 h-15 sm:w-24 sm:h-24 md:w-28 md:h-28"
            src="/logo.png"
            alt="Logo"
            width={70}
            height={70}
            suppressHydrationWarning
            />
        </div>
            </Link>

        {/* Navigation */}
        <div className="flex justify-center items-center sm:gap-10 gap-5 px-1">

          {/* About Dropdown */}
          <div className="relative group">
            <Link href="/about">
              <h2 className="text-2xl font-semibold cursor-pointer">
                About
              </h2></Link>


            {/* Dropdown Content */}
            <div className="absolute mt-3 min-w-80 h-auto -right-9 bg-white shadow-lg rounded-lg p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform scale-95 group-hover:scale-100 transition-all duration-300 ease-in-out">
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>PDphilE</strong> is an open-source minimalist PDF merger tool that allows users to merge PDFs effortlessly. It's lightweight, user-friendly, and completely free.
              </p>

              {/* Owner Info */}
              <div className="flex items-center gap-3 mt-4">
                <LucideUser size={22} className="text-gray-600" suppressHydrationWarning />
                <p className="text-lg text-gray-800 font-medium">
                  Developed by <a href="https://github.com/subhk02" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Subham</a>
                </p>
              </div>

              {/* GitHub Repo Link */}
              <a href="https://github.com/subhk02/PDphilE" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-4 text-gray-700 hover:text-black">
                <LucideGithub size={20} suppressHydrationWarning /> <span className="text-lg" >GitHub Repo</span>
              </a>
            </div>
          </div>

          {/* GitHub Icon Link */}
          <a href="https://github.com/subhk02/PDphilE" target="_blank">
            <LucideGithub size={30} className="hover:text-black transition-colors duration-200" suppressHydrationWarning />
          </a>

        </div>
      </div>
    </>
  );
};

export default Navbar;
