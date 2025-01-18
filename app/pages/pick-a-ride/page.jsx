"use client";

import GoogleMapSection from "../../components/GoogleMapSection";
import NavigationBar from "../../components/NavigationBar";
import SearchMapSection from "../../components/SearchSection";
import { DestinationContext } from "../../context/DestinationContext";
import { SourceContext } from "../../context/SourceContext";

import { LoadScript } from "@react-google-maps/api";

import { useEffect, useState } from "react";

export default function PickARide() {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>
      <NavigationBar />

      <div className="mt-16">
        <SourceContext.Provider value={{ source, setSource }}>
          <DestinationContext.Provider value={{ destination, setDestination }}>
            <LoadScript
              libraries={["places"]}
              googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ""}
              onError={() => console.error("Error loading Google Maps API")}
            >
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                <SearchMapSection />
                <div className="col-span-2">
                  <GoogleMapSection />
                </div>
              </div>
            </LoadScript>
          </DestinationContext.Provider>
        </SourceContext.Provider>
      </div>
    </div>
  );
}
