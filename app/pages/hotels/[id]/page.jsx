"use client";

import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HotelDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchHotelDetails = async () => {
      try {
        // Adjust the endpoint to match your backend API route
        const res = await fetch(`http://localhost:5000/api/hotels/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch hotel details");
        }
        const data = await res.json();
        setHotel(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{hotel.name}</h1>
      <p>City: {hotel.city}</p>
      <p>Description: {hotel.description}</p>
      <p>Cheapest Price: ${hotel.cheapestPrice}</p>
      {/* Display the main image */}
      {hotel.HotelImg && (
        <Image
          src={`http://localhost:5000/images/${hotel.HotelImg}`}
          alt={hotel.name}
          width={200}
          height={200}
        />
      )}

      {/* Display additional images */}
      <h2>Additional Images</h2>
      <div>
        {hotel.HotelImgs?.map((img, index) => (
          <Image
            key={index}
            src={`http://localhost:5000/images/${img}`}
            alt={`Hotel Image ${index + 1}`}
            width={200}
            height={200}
          />
        ))}
      </div>
    </div>
  );
}
