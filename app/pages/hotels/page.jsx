"use client";
import { useEffect, useState } from "react";
import { fetchAllHotels } from "../../../services/hotelService";
import Link from "next/link";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHotels = async () => {
      try {
        const data = await fetchAllHotels();
        setHotels(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getHotels();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>All Hotels</h1>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel._id}>
            <Link href={`/hotels/${hotel._id}`}>
              <h2>{hotel.name}</h2>
              <p>{hotel.city}</p>
              <p>{hotel.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
