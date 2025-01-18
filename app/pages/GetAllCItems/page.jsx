"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";

const CampaignItemsList = () => {
  const [campaignItems, setCampaignItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaignItems = async () => {
      try {
        const response = await fetch("/api/get-all-c-items");
        if (!response.ok) {
          throw new Error("Failed to fetch campaign items.");
        }
        const data = await response.json();
        setCampaignItems(data.campaignItems || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCampaignItems();
  }, []);

  if (loading) return <p>Loading campaign items...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="campaign-items-list">
      <NavigationBar />
      <h2 className="text-2xl font-bold mb-4">All Campaign Items</h2>
      {campaignItems.length === 0 ? (
        <p>No campaign items found.</p>
      ) : (
        <ul>
          {campaignItems.map((item) => (
            <li key={item.id} className="mb-4">
              <p>{item.id}</p>
              <Image src={item.imageUrl} alt="" width={300} height={300} />
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p>{item.description}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Posted By: {item.clerkUserName}</p>
              <Link
                href={`../../pages/GetAllCItems/${item.id}`}
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

export default CampaignItemsList;
