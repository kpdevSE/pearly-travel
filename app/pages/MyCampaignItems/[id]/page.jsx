"use client";

import { useParams } from "next/navigation"; // For dynamic parameters in App Router
import { useEffect, useState } from "react";
import NavigationBar from "../../../components/NavigationBar";
import Image from "next/image";

const CampaignItemDetails = () => {
  const { id } = useParams();
  const [campaignItem, setCampaignItem] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(id);

  useEffect(() => {
    const fetchCampaignItemDetails = async () => {
      try {
        const response = await fetch(`/api/get-a-c-items/${id}`);
        const data = await response.json();

        console.log("API Response:", data);
        console.log("HTTP Status Code:", response.status);
        if (response.ok && data.success && data.campaignItems) {
          setCampaignItem(data.campaignItems); // Set the campaignItems object
        } else {
          console.error("Error:", data.error || "Unexpected API response");
        }
      } catch (error) {
        console.error("Error fetching campaign item:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCampaignItemDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!campaignItem) return <p>Campaign Item not found.</p>;

  return (
    <div>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold">{campaignItem.name}</h1>
        <Image
          src={campaignItem.imageUrl}
          alt={campaignItem.name}
          className="w-full rounded-lg mt-4"
          width={300}
          height={300}
        />
        <p>{campaignItem.description}</p>
        <p>
          <strong>Quantity:</strong> {campaignItem.quantity}
        </p>
        <p>
          <strong>Price:</strong> ${campaignItem.price.toFixed(2)}
        </p>
        <p>
          <strong>Posted By:</strong> {campaignItem.clerkUserName}
        </p>
        <p>
          <strong>Contact:</strong> {campaignItem.clerkUserEmail}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(campaignItem.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default CampaignItemDetails;
