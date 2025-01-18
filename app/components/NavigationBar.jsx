"use client";

import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import Link from "next/link";
import logoImage from "../../public/logonew.png";

import Navbar from "../components/Navbar";
import DashboardDrawer from "../components/DashboardDrawer";

export default function NavigationBar() {
  const { isSignedIn } = useUser();

  return (
    <div>
      {!isSignedIn ? (
        <nav className="absolute top-0 left-0 w-full bg-black/40 backdrop-blur-md text-white p-4 z-50 hidden lg:block md:block">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center justify-center gap-2">
              <Image src={logoImage} alt="logo" width={100} height={100} />
              <p>|</p>
              <h1 className="text-xl font-bold">Travel Explorer</h1>
            </div>

            <ul className="lg:flex space-x-6 hidden ">
              <>
                <li>
                  <Link href="/" className="hover:text-gray-300 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="../pages/About"
                    className="hover:text-gray-300 transition"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="../pages/ContactUs"
                    className="hover:text-gray-300 transition"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sign-up"
                    className="hover:text-gray-300 transition hover:cursor-pointer"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    href="../pages/Admin"
                    className="hover:text-gray-300 transition hover:cursor-pointer"
                  >
                    Only Admin
                  </Link>
                </li>
              </>
            </ul>
          </div>
        </nav>
      ) : (
        <DashboardDrawer />
      )}
      <div className="lg:hidden block">
        <Navbar />
      </div>
    </div>
  );
}
