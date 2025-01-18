"use client";
import { useState } from "react";
import { UploadDropzone } from "../../../utils/uploadthing";
import { useUser } from "@clerk/nextjs"; // Import Clerk hook

const AddCampaignItemForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    description: "",
    quantity: "",
    price: "",
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
      alert("You need to be logged in to add a campaign item.");
      return;
    }

    try {
      const response = await fetch("/api/add-c-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          quantity: parseInt(formData.quantity, 10),
          price: parseFloat(formData.price),
          clerkUserId: user.id, // Pass Clerk user ID
          clerkUserName: user.fullName || user.username || "Anonymous",
          clerkUserEmail: user.primaryEmailAddress?.emailAddress || "",
        }),
      });

      if (response.ok) {
        alert("Campaign item added successfully!");
        setFormData({
          name: "",
          imageUrl: "",
          description: "",
          quantity: "",
          price: "",
        });
      } else {
        alert("Failed to add campaign item. Please try again.");
      }
    } catch (error) {
      console.log("Error adding campaign item:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Add Campaign Item
      </h2>
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
        <label className="block text-gray-700 font-medium mb-2">Image</label>
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
          <p className="text-green-600 mt-2">Image uploaded successfully!</p>
        )}
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
        <label className="block text-gray-700 font-medium mb-2">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add Campaign Item
      </button>
    </form>
  );
};

export default AddCampaignItemForm;
