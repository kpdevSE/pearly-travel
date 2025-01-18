"use client";
import { CarListData } from "../../utils/CarListData";
import CarListItem from "./CarListItem";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CarListOptions({ distance }) {
  const [activeIndex, setActiveIndex] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const router = useRouter();

  return (
    <div className="mt-5 p-3 overflow-auto h-[450px]">
      <h2 className="text-[22px] font-bold">Recommended</h2>
      {CarListData.map((item, index) => (
        <div
          key={item.id}
          className={`cursor-pointer p-2 rounded border-black ${
            activeIndex === index ? "border-[1px]" : ""
          }`}
          onClick={() => {
            setActiveIndex(index);
            setSelectedCar(item);
          }}
        >
          <CarListItem car={item} distance={distance} />
        </div>
      ))}

      {selectedCar?.name ? (
        <div className="flex justify-between fixed bottom-5 bg-white p-3 shadow-xl w-full md:w-[30%] border-[1px] rounded items-center">
          <h2>Make Payment</h2>
          <button
            className="p-3 bg-black text-white rounded-lg text-center"
            onClick={() => {
              const amount = (selectedCar.amount * distance).toFixed(2);
              console.log("Redirecting to payment with amount:", amount);
              router.push(`../pages/payment?amount=${amount}`);
            }}
          >
            Request {selectedCar.name}
          </button>
        </div>
      ) : null}
    </div>
  );
}
