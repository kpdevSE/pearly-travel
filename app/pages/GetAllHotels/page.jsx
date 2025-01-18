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
      <div
        className="relative h-screen flex flex-col bg-cover bg-center "
        style={{ backgroundImage: "url('/hotel.jpg')" }}
      >
        <NavigationBar />
        <div className="flex items-start justify-center flex-col h-screen w-[90%] mx-auto gap-4">
          <h1 className="text-[40px] text-white font-mono font-semibold">
            Discover the perfect balance
            <br /> of hospitality, luxury and comfort.
          </h1>
          <p className="text-white text-[20px]">
            We are focused on providing clients with the highest level of
            <br />
            comfort and excellent affordable rates
          </p>
          <button className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-[8px] shadow-md shadow-gray-800/50 hover:bg-black hover:shadow-lg hover:shadow-gray-800/70 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200">
            Book Now
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
      </div>
      <div className="w-[90%] mx-auto">
        <h2 className="text-2xl font-bold mb-4 mt-10">
          This is Our Hotels
          <br /> You can get more comfortable with ...
        </h2>
        {hotels.length === 0 ? (
          <p>No hotels found.</p>
        ) : (
          <div className="grid gap-6 p-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-[6px] shadow-md p-4 pb-10 mb-6 max-w-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Hotel Image */}
                <Image
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />

                {/* Hotel Info */}
                <div className="mt-4 flex flex-col gap-3">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {hotel.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Location:</span>{" "}
                    {hotel.location}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Price per night:</span> $
                    {hotel.pricePerNight}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    <span className="font-medium">Available Rooms:</span>{" "}
                    {hotel.availableRooms}
                  </p>

                  <Link
                    href={`../../pages/GetAllHotels/${hotel.id}`}
                    className="px-6 py-3 w-[160px] bg-gray-900 text-white font-semibold rounded-[8px] shadow-md shadow-gray-800/50 hover:bg-black hover:shadow-lg hover:shadow-gray-800/70 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelsList;
