"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Image from "next/image";
import { UploadDropzone } from "@uploadthing/react";
import { useUser } from "@clerk/nextjs"; // To get the logged-in user's email

const HotelDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useUser(); // Get logged-in user
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    location: "",
    description: "",
    pricePerNight: "",
    availableRooms: "",
  });

  // Fetch hotel details
  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`/api/get-all-hotels/${id}`);
        const data = await response.json();

        if (response.ok) {
          setHotel(data.hotel);
          setFormData(data.hotel);
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

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit the updated hotel details
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only allow the logged-in user to update their own hotel

    const updatedHotelData = {
      ...formData,
      imageUrl: imageUrl || formData.imageUrl,
    };

    try {
      const response = await fetch(`/api/get-all-hotels/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedHotelData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Hotel updated successfully.");
        router.push("../../../pages/GetAllHotels");
      } else {
        console.error(data.error);
        alert("Failed to update the hotel.");
      }
    } catch (error) {
      console.error("Error updating hotel:", error);
      alert("An error occurred while updating the hotel.");
    }
  };

  // Delete hotel (only if logged-in user is the clerk)
  const handleDelete = async () => {
    const confirmDelete = confirm(
      `Are you sure you want to delete the hotel "${hotel.name}"?`
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/get-all-hotels/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Hotel deleted successfully.");
        router.push("../../../pages/GetAllHotels");
      } else {
        const data = await response.json();
        console.error(data.error);
        alert("Failed to delete the hotel.");
      }
    } catch (error) {
      console.error("Error deleting hotel:", error);
      alert("An error occurred while deleting the hotel.");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!hotel) return <p>Hotel not found.</p>;
  console.log(hotel.clerkUserEmail);
  console.log(user.emailAddresses);

  return (
    <div>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold">{hotel.name}</h1>
        <h1>{hotel.id}</h1>
        <Image
          src={hotel.imageUrl}
          alt={hotel.name}
          className="w-full rounded-lg mt-4"
          width={200}
          height={200}
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

        {hotel.clerkUserEmail ===
        user.emailAddresses.map((email) => email.emailAddress).join(", ") ? (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Delete Hotel
          </button>
        ) : null}

        {hotel.clerkUserEmail ===
        user.emailAddresses.map((email) => email.emailAddress).join(", ") ? (
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mb-4">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                />
              </div>
              <div className="mb-4">
                <label>Image</label>
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    console.log("Upload complete response:", res);
                    if (res && res.length > 0) {
                      setImageUrl(res[0].url);
                    } else {
                      console.error("Unexpected response format:", res);
                    }
                  }}
                  onUploadError={(error) => {
                    console.error("Error during upload:", error);
                    alert(`Error uploading image: ${error.message}`);
                  }}
                />
                {imageUrl && (
                  <div className="mt-2">
                    <img
                      src={imageUrl}
                      alt="Uploaded preview"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                />
              </div>
              <div className="mb-4">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                />
              </div>
              <div className="mb-4">
                <label>Price Per Night</label>
                <input
                  type="number"
                  name="pricePerNight"
                  value={formData.pricePerNight}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                />
              </div>
              <div className="mb-4">
                <label>Available Rooms</label>
                <input
                  type="number"
                  name="availableRooms"
                  value={formData.availableRooms}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto"
              >
                Update
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default HotelDetails;
