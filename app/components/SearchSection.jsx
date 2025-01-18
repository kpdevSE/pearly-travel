"use client";
import { useContext, useEffect, useState } from "react";
import InputItem from "./InputItem";
import { SourceContext } from "../context/SourceContext";
import { DestinationContext } from "../context/DestinationContext";
import CarListOptions from "./CarListOptions";

export default function SearchMapSection() {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const [distance, setDistance] = useState();

  const calculateDistance = () => {
    if (!source || !destination) {
      console.log("Source or Destination is missing.");
      return;
    }

    if (
      typeof source.lat !== "number" ||
      typeof source.lng !== "number" ||
      typeof destination.lat !== "number" ||
      typeof destination.lng !== "number"
    ) {
      console.log("Invalid coordinates:", source, destination);
      return;
    }

    const dist = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(source.lat, source.lng),
      new google.maps.LatLng(destination.lat, destination.lng)
    );

    console.log("Distance:", dist * 0.000621374);
    setDistance(dist * 0.000621374);
  };

  useEffect(() => {
    console.log("Updated Source:", source);
    console.log("Updated Destination:", destination);
  }, [source, destination]);

  return (
    <div>
      <div className="p-4 border-2 rounded-xl">
        <p className="text-2xl font-bold">Get a Ride</p>
        <InputItem type="source" />
        <InputItem type="destination" />
        <button
          className="p-3 bg-black w-full mt-5 text-white rounded-md"
          onClick={calculateDistance}
        >
          Search
        </button>
      </div>
      {distance ? <CarListOptions distance={distance} /> : null}
    </div>
  );
}
