"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("/api/get-all-hotels");
        if (!response.ok) {
          throw new Error("Failed to fetch hotels.");
        }
        const data = await response.json();
        setHotels(data.hotels || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="hotels-list">
      <NavigationBar />
      <h2 className="text-2xl font-bold mb-4">All Hotels</h2>
      {hotels.length === 0 ? (
        <p>No hotels found.</p>
      ) : (
        <ul>
          {hotels.map((hotel) => (
            <li key={hotel.id} className="mb-4">
              <p>{hotel.id}</p>
              <Image src={hotel.imageUrl} alt="" width={300} height={300} />
              <h3 className="text-xl font-semibold">{hotel.name}</h3>
              <p>{hotel.location}</p>
              <p>Price per night: ${hotel.pricePerNight}</p>
              <p>Available Rooms: {hotel.availableRooms}</p>
              <Link
                href={`../../pages/GetAllHotels/${hotel.id}`}
                className="text-blue-500 underline"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HotelsList;
