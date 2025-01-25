import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { UploadDropzone } from "../../utils/uploadthing";
import { useRouter } from "next/navigation";
import { errorToJSON } from "next/dist/server/render";

const ModalComponent = ({
  isOpen,
  closeModal,
  onSubmit,
  hotelData,
  hotelid,
}) => {
  const [formData, setFormData] = useState(hotelData);

  const router = useRouter();

  console.log(hotelid);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(hotelData);

  const setImageUrl = (url) => {
    setFormData((prev) => ({ ...prev, imageUrl: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make the API call to update the hotel data
    try {
      const response = await fetch(`/api/get-all-hotels/${hotelid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Hotel updated successfully:", result);
        onSubmit(result);
        closeModal();
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      alert("An error occurred while updating the hotel.");
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="size-6 text-red-600"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    Update Hotel
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Update your hotel details, including name, location, and
                      price.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <img
                        src={formData.imageUrl}
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
                  type="button"
                  onClick={closeModal}
                  className="inline-flex w-full justify-center rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-500 sm:ml-3 sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Update
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalComponent;
