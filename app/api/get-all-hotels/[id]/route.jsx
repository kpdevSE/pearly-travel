import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const id = await params?.id;

    if (!id) {
      return NextResponse.json(
        { error: "Hotel ID is required." },
        { status: 400 }
      );
    }

    const hotel = await prisma.hotel.findUnique({
      where: { id },
    });

    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, hotel }, { status: 200 });
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the hotel." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params?.id;

    if (!id) {
      return NextResponse.json(
        { error: "Hotel ID is required." },
        { status: 400 }
      );
    }

    const hotel = await prisma.hotel.findUnique({
      where: { id },
    });

    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found." }, { status: 404 });
    }

    await prisma.hotel.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: "Hotel deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting hotel:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the hotel." },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const id = params?.id; // Extract the `id` from the URL parameters

  if (req.method === "PUT") {
    const {
      name,
      imageUrl,
      location,
      description,
      pricePerNight,
      availableRooms,
    } = await req.json(); // Get data from the request body

    // Validate all required fields
    if (
      !name ||
      !imageUrl ||
      !location ||
      !description ||
      !pricePerNight ||
      !availableRooms
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Ensure pricePerNight is a float
    const pricePerNightFloat = parseFloat(pricePerNight);
    if (isNaN(pricePerNightFloat)) {
      return NextResponse.json(
        { error: "Price per night must be a valid number" },
        { status: 400 }
      );
    }

    // Ensure availableRooms is an integer
    const availableRoomsInt = parseInt(availableRooms, 10);
    if (isNaN(availableRoomsInt)) {
      return NextResponse.json(
        { error: "Available rooms must be a valid integer" },
        { status: 400 }
      );
    }

    try {
      // Perform the update using Prisma
      const updatedHotel = await prisma.hotel.update({
        where: {
          id: id, // Use the `id` from the URL
        },
        data: {
          name,
          imageUrl,
          location,
          description,
          pricePerNight: pricePerNightFloat, // Pass as float
          availableRooms: availableRoomsInt, // Pass as integer
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(
        { message: "Hotel updated successfully", hotel: updatedHotel },
        { status: 200 }
      );
    } catch (error) {
      // Handle error logging more gracefully
      const errorMessage =
        error instanceof Error ? error.message : JSON.stringify(error);

      console.log("Error updating hotel:", errorMessage); // Log the error message

      return NextResponse.json(
        { error: "An error occurred while updating the hotel" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
}
