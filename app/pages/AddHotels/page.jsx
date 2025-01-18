"use client";
import { useState } from "react";
import { UploadDropzone } from "../../../utils/uploadthing";
import { useUser } from "@clerk/nextjs";
import NavigationBar from "../../components/NavigationBar";

import { useRouter } from "next/navigation";

const AddHotelForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    location: "",
    description: "",
    pricePerNight: "",
    availableRooms: "",
  });

  const { user } = useUser();
  console.log(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const setImageUrl = (url) => {
    setFormData((prev) => ({ ...prev, imageUrl: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You need to be logged in to add a hotel.");
      return;
    }

    try {
      const response = await fetch("/api/add-hoels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          pricePerNight: parseFloat(formData.pricePerNight),
          availableRooms: parseInt(formData.availableRooms, 10),
          clerkUserId: user.id, // Pass Clerk user ID
          clerkUserName: user.fullName || user.username || "Anonymous", // Pass Clerk user name
          clerkUserEmail: user.primaryEmailAddress?.emailAddress || "", // Pass Clerk email
        }),
      });

      if (response.ok) {
        alert("Hotel added successfully!");
        setFormData({
          name: "",
          imageUrl: "",
          location: "",
          description: "",
          pricePerNight: "",
          availableRooms: "",
        });
        router.push("../../pages/GetAllHotels");
      } else {
        alert("Failed to add hotel. Please try again.");
      }
    } catch (error) {
      console.log("Error adding hotel:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="w-[90%] mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto bg-white shadow-md rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Hotel</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Image
            </label>
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
            {formData.imageUrl && (
              <p className="text-green-600 mt-2">
                Image uploaded successfully!
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Price Per Night
            </label>
            <input
              type="number"
              name="pricePerNight"
              value={formData.pricePerNight}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Available Rooms
            </label>
            <input
              type="number"
              name="availableRooms"
              value={formData.availableRooms}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Hotel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHotelForm;
