import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      imageUrl,
      location,
      description,
      pricePerNight,
      availableRooms,
      clerkUserId,
      clerkUserName,
      clerkUserEmail,
    } = body;

    if (
      !name ||
      !imageUrl ||
      !location ||
      !description ||
      !pricePerNight ||
      !availableRooms ||
      !clerkUserId ||
      !clerkUserEmail
    ) {
      return NextResponse.json(
        { error: "All fields are required, including user information." },
        { status: 400 }
      );
    }

    // Create a new hotel record in the database
    const newHotel = await prisma.hotel.create({
      data: {
        name,
        imageUrl,
        location,
        description,
        pricePerNight: parseFloat(pricePerNight),
        availableRooms: parseInt(availableRooms, 10),
        clerkUserId,
        clerkUserName: clerkUserName || "Anonymous",
        clerkUserEmail,
      },
    });

    // Respond with the created hotel data
    return NextResponse.json(
      { success: true, hotel: newHotel },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating hotel:", error);

    return NextResponse.json(
      { error: "An error occurred while adding the hotel." },
      { status: 500 }
    );
  }
}
