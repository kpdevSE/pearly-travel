"use client";
import { useContext, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { SourceContext } from "../context/SourceContext";
import { DestinationContext } from "../context/DestinationContext";

export default function InputItem({ type }) {
  const [value, setValue] = useState(null);
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const placeholder =
    type === "source" ? "Pickup Location" : "Dropoff Location";

  const getLatAndLng = (place, type) => {
    if (!place?.value?.place_id) {
      console.error("Invalid place selection", place);
      return;
    }

    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails({ placeId }, (place, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        place.geometry?.location
      ) {
        const lat = parseFloat(place.geometry.location.lat());
        const lng = parseFloat(place.geometry.location.lng());

        const locationData = {
          lat,
          lng,
          name: place.formatted_address,
          label: place.name,
        };

        if (type === "source") {
          setSource(locationData);
        } else if (type === "destination") {
          setDestination(locationData);
        }

        console.log("Updated location:", locationData);
      } else {
        console.log("Failed to retrieve place details:", status);
      }
    });
  };

  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      {!process.env.NEXT_PUBLIC_GOOGLE_API_KEY ? (
        <p className="text-red-500">Google API key is missing</p>
      ) : (
        <GooglePlacesAutocomplete
          selectProps={{
            value,
            onChange: (place) => {
              getLatAndLng(place, type);
              setValue(place);
            },
            placeholder,
            isClearable: true,
            inputId: `${type}-location-input`,
            className: "w-full",
            components: {
              DropdownIndicator: false,
            },
            styles: {
              control: (provided) => ({
                ...provided,
                backgroundColor: "transparent",
              }),
            },
          }}
        />
      )}
    </div>
  );
}
