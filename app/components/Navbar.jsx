"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Example() {
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 text-white font-bold relative top-7 left-8"
        onClick={() => {
          setOpen(true);
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
        />
      </svg>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4"></div>
                </TransitionChild>
                <div className="flex h-full flex-col overflow-y-scroll bg-black/40 backdrop-blur-md text-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6 flex items-center justify-between">
                    <DialogTitle className="text-base font-semibold text-gray-900">
                      Panel title
                    </DialogTitle>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon aria-hidden="true" className="size-6" />
                    </button>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <ul className="flex flex-col space-x-6 ">
                      {!isSignedIn ? (
                        <>
                          <li>
                            <Link
                              href="/"
                              className="hover:text-gray-300 transition"
                            >
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
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-7">
                          <Link href={"../pages/dashboardHome"}>Dashboard</Link>
                          <Link href={"/pages/pick-a-ride"}>Pick a Ride</Link>
                          <li>
                            <UserButton />
                          </li>
                        </div>
                      )}
                    </ul>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
