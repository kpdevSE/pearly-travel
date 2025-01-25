"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { UserButton } from "@clerk/clerk-react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Dropdown from "../components/Dropdown";
import NextDropDown from "../components/NextDropDown";
import Link from "next/link";
import Image from "next/image";
import logoImage from "../../public/logo.png";

export default function DashboardDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-[90%] mx-auto">
      <div className="bg-white w-[50px] h-[50px] rounded-full flex items-center justify-center relative top-10 shadow-[0_4px_15px_rgba(255,255,255,0.7)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-menu text-black font-bold"
          onClick={() => {
            setOpen(true);
          }}
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
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
                  <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
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
                </TransitionChild>
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold text-gray-900 flex items-center justify-between">
                      <div className="flex items-center justify-center gap-2">
                        <Image
                          src={logoImage}
                          alt="logo"
                          width={100}
                          height={100}
                        />
                        <p>|</p>
                        <h1 className="text-xl font-bold">Travel Explorer</h1>
                      </div>
                      <UserButton />
                    </DialogTitle>
                  </div>
                  <div className="relative mt-6 flex-1 px-1 sm:px-2">
                    <div className="flex items-start justify-start flex-col space-y-6 p-4 w-full">
                      {/* Links Section */}
                      <div className="flex flex-col items-start space-y-4 overflow-y-auto">
                        <Link
                          href="../pages/dashboardHome"
                          className="flex items-center gap-3 px-1 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-100 "
                        >
                          <div className="flex items-start justify-start gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="34"
                              height="34"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-layout-dashboard font-semibold text-black"
                            >
                              <rect width="7" height="9" x="3" y="3" rx="1" />
                              <rect width="7" height="5" x="14" y="3" rx="1" />
                              <rect width="7" height="9" x="14" y="12" rx="1" />
                              <rect width="7" height="5" x="3" y="16" rx="1" />
                            </svg>
                            <p>Dashboard</p>
                          </div>
                        </Link>
                        <Link
                          href="../pages/pick-a-ride"
                          className="flex items-center gap-3 px-1 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-100 "
                        >
                          <div className="flex items-start justify-start gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="34"
                              height="34"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-car-front font-semibold text-black"
                            >
                              <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" />
                              <path d="M7 14h.01" />
                              <path d="M17 14h.01" />
                              <rect width="18" height="8" x="3" y="10" rx="2" />
                              <path d="M5 18v2" />
                              <path d="M19 18v2" />
                            </svg>
                            <p>Pick a Ride</p>
                          </div>
                        </Link>
                        <Link
                          href="../pages/AddHotels"
                          className="block px-1 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-100 w-full"
                          role="menuitem"
                        >
                          <div className="flex items-start justify-start gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="34"
                              height="34"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-house-plus font-semibold text-black"
                            >
                              <path d="M13.22 2.416a2 2 0 0 0-2.511.057l-7 5.999A2 2 0 0 0 3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7.354" />
                              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                              <path d="M15 6h6" />
                              <path d="M18 3v6" />
                            </svg>
                            <p>Add a Locations</p>
                          </div>
                        </Link>
                        <Link
                          href="../pages/AddCItems"
                          className="block px-1 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          <div className="flex items-start justify-start gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="34"
                              height="34"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-circle-plus font-semibold text-black"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="M8 12h8" />
                              <path d="M12 8v8" />
                            </svg>
                            <p>Add Campaign Items</p>
                          </div>
                        </Link>
                        <Link
                          href="../pages/GetAllHotels"
                          className="flex items-center gap-3 px-1 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-100 "
                          role="menuitem"
                        >
                          <div className="flex items-start justify-start gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="34"
                              height="34"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-hotel text-black"
                            >
                              <path d="M10 22v-6.57" />
                              <path d="M12 11h.01" />
                              <path d="M12 7h.01" />
                              <path d="M14 15.43V22" />
                              <path d="M15 16a5 5 0 0 0-6 0" />
                              <path d="M16 11h.01" />
                              <path d="M16 7h.01" />
                              <path d="M8 11h.01" />
                              <path d="M8 7h.01" />
                              <rect x="4" y="2" width="16" height="20" rx="2" />
                            </svg>
                            <p>All Hotels</p>
                          </div>
                        </Link>
                        <Link
                          href="../pages/GetAllCItems"
                          className="flex items-center gap-3 px-1 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-100  "
                          role="menuitem"
                        >
                          <div className="flex items-start justify-start gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="34"
                              height="34"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-tent-tree text-black"
                            >
                              <circle cx="4" cy="4" r="2" />
                              <path d="m14 5 3-3 3 3" />
                              <path d="m14 10 3-3 3 3" />
                              <path d="M17 14V2" />
                              <path d="M17 14H7l-5 8h20Z" />
                              <path d="M8 14v8" />
                              <path d="m9 14 5 8" />
                            </svg>
                            <p> All Campaign Items</p>
                          </div>
                        </Link>
                        <Link
                          href="../pages/MyLocations"
                          className="flex items-center gap-3 px-1 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          <div className="flex items-start justify-start gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="34"
                              height="34"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-map-pin-house text-black font-semibold"
                            >
                              <path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z" />
                              <path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2" />
                              <path d="M18 22v-3" />
                              <circle cx="10" cy="10" r="3" />
                            </svg>
                            <p>My Locations</p>
                          </div>
                        </Link>
                        <Link
                          href="../pages/MyCampaignItems"
                          className="flex items-center gap-3 px-1 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          <div className="flex items-start justify-start gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="34"
                              height="34"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-tent-tree text-black font-semibold"
                            >
                              <circle cx="4" cy="4" r="2" />
                              <path d="m14 5 3-3 3 3" />
                              <path d="m14 10 3-3 3 3" />
                              <path d="M17 14V2" />
                              <path d="M17 14H7l-5 8h20Z" />
                              <path d="M8 14v8" />
                              <path d="m9 14 5 8" />
                            </svg>
                            <p>My Campaign Items</p>
                          </div>
                        </Link>
                        <Link
                          href="../pages/MyBookings"
                          className="flex items-center gap-3 px-1 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          <div className="flex items-start justify-start gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="34"
                              height="34"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="lucide lucide-book-open-check text-black font-semibold"
                            >
                              <path d="M12 21V7" />
                              <path d="m16 12 2 2 4-4" />
                              <path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3" />
                            </svg>
                            <p>My Bookings</p>
                          </div>
                        </Link>
                        <Link
                          href="../pages/MyProfile"
                          className="flex items-center gap-3 px-1 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          <div className="flex items-start justify-start gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="34"
                              height="34"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-circle-user-round text-black font-semibold"
                            >
                              <path d="M18 20a6 6 0 0 0-12 0" />
                              <circle cx="12" cy="10" r="4" />
                              <circle cx="12" cy="12" r="10" />
                            </svg>
                            <p>My Profile</p>
                          </div>
                        </Link>
                      </div>
                    </div>
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
