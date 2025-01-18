"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import { SourceContext } from "../context/SourceContext";
import { DestinationContext } from "../context/DestinationContext";

export default function GoogleMapSection() {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [directionRoutePoint, setDirectionRoutePoint] = useState([]);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(null);

  const containerStyle = {
    width: "100%",
    height: window.innerWidth * 0.5,
  };

  useEffect(() => {
    console.log("Source:", source);

    if (source && source.lat && source.lng && map) {
      setCenter({
        lat: parseFloat(source.lat),
        lng: parseFloat(source.lng),
      });

      if (destination) {
        directionroute();
      }
    } else {
      console.log("Source is missing or invalid.");
    }
  }, [source]);

  useEffect(() => {
    console.log("Destination:", destination);

    if (destination && destination.lat && destination.lng && map) {
      setCenter({
        lat: parseFloat(destination.lat),
        lng: parseFloat(destination.lng),
      });

      if (source) {
        directionroute();
      }
    } else {
      console.log("Destination is missing or invalid.");
    }
  }, [destination]);

  const directionroute = () => {
    if (
      !source ||
      !source.lat ||
      !source.lng ||
      !destination ||
      !destination.lat ||
      !destination.lng
    ) {
      console.log("Source or Destination is missing");
      return;
    }

    if (
      !window.google ||
      !window.google.maps ||
      !window.google.maps.DirectionsService
    ) {
      console.error("Google Maps API is not fully loaded yet.");
      return;
    }

    const DirectionService = new window.google.maps.DirectionsService();
    DirectionService.route(
      {
        origin: { lat: parseFloat(source.lat), lng: parseFloat(source.lng) },
        destination: {
          lat: parseFloat(destination.lat),
          lng: parseFloat(destination.lng),
        },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          console.log("Route found:", result);
          setDirectionRoutePoint(result.routes);
        } else {
          console.error("Directions request failed:", status);
        }
      }
    );
  };

  const onLoad = React.useCallback((map) => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API failed to load.");
      return;
    }
    console.log("Google Maps Loaded!");
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center || { lat: 6.9271, lng: 79.8612 }}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Marker for Source */}
      {source && source.lat && source.lng ? (
        <Marker
          position={{
            lat: parseFloat(source.lat),
            lng: parseFloat(source.lng),
          }}
        >
          <OverlayView
            position={{
              lat: parseFloat(source.lat),
              lng: parseFloat(source.lng),
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="bg-white font-bold inline-block">
              <p className="text-black text-[16px]">{source.label}</p>
            </div>
          </OverlayView>
        </Marker>
      ) : null}

      {/* Marker for Destination */}
      {destination && destination.lat && destination.lng ? (
        <Marker
          position={{
            lat: parseFloat(destination.lat),
            lng: parseFloat(destination.lng),
          }}
        >
          <OverlayView
            position={{
              lat: parseFloat(destination.lat),
              lng: parseFloat(destination.lng),
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="bg-white font-bold inline-block">
              <p className="text-black text-[16px]">{destination.label}</p>
            </div>
          </OverlayView>
        </Marker>
      ) : null}

      {/* <DirectionsRenderer
        directions={{
          routes: directionRoutePoint,
        }}
        options={{
          polylineOptions: {
            strokeColor: "#000",
            strokeWeight: 5,
          },
          suppressMarkers: true,
        }}
      /> */}
    </GoogleMap>
  );
}
