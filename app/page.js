import Link from "next/link";
import React from "react";
import NavigationBar from "./components/NavigationBar";
import TopButton from "./components/TopButton.jsx";
import { LocationList } from "../utils/LocationsData";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div
        className="relative h-screen flex flex-col justify-center items-start bg-cover bg-center "
        style={{ backgroundImage: "url('/sigiriya.jpg')" }}
      >
        <NavigationBar />
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
        <div className="relative z-10 text-white lg:text-center text-start w-[90%] m-auto flex flex-col items-start lg:justify-center justify-start">
          <h1 className="text-[40px] font-bold">
            Mountains | museums | Beaches
          </h1>
          <p className="text-[30px] tracking-widest">
            Life is a journey <br />
            Not a destination.
          </p>
          <Link href="/sign-in">
            <button className="bg-green-200 text-green-800 w-[200px] h-[40px] mt-9 font-semibold py-2 px-4 rounded-lg hover:bg-green-300 transition-all ">
              Enjoy Your Journey
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-10 w-[90%] m-auto h-full">
        <h1 className="text-center text-[30px]">This is another part</h1>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 w-full place-items-center mt-10">
          {LocationList.map((index) => {
            return (
              <div key={index.id}>
                <div className="flex  flex-col items-start justify-start gap-2 p-3 font-semibold text-[20px] rounded-lg  shadow-[0px_10px_20px_rgba(144,238,144,0.6)] hover:shadow-[0px_10px_20px_rgba(144,238,144,0.6)] transition-all">
                  <Image src={index.image} alt="lt" width={250} height={400} />
                  <h2>{index.name}</h2>

                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-yellow-300 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </div>
                  <Link href={"/sign-in"} className="mt-2">
                    <button
                      type="button"
                      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      View More
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <TopButton />
    </div>
  );
}
