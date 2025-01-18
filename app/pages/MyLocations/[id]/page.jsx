"use client";

import { useParams } from "next/navigation"; // For dynamic parameters in App Router
import { useEffect, useState } from "react";
import NavigationBar from "../../../components/NavigationBar";

const HotelDetails = () => {
  const { id } = useParams(); // Get the dynamic 'id' from the URL
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`/api/get-all-hotels/${id}`);
        const data = await response.json();

        if (response.ok) {
          setHotel(data.hotel);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching hotel:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchHotelDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!hotel) return <p>Hotel not found.</p>;

  return (
    <div>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold">{hotel.name}</h1>
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="w-full rounded-lg mt-4"
        />
        <p>{hotel.description}</p>
        <p>
          <strong>Location:</strong> {hotel.location}
        </p>
        <p>
          <strong>Price Per Night:</strong> ${hotel.pricePerNight}
        </p>
        <p>
          <strong>Available Rooms:</strong> {hotel.availableRooms}
        </p>
        <p>
          <strong>Contact:</strong> {hotel.clerkUserEmail}
        </p>
      </div>
    </div>
  );
};

export default HotelDetails;
