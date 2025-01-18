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
