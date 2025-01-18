import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const hotels = await prisma.hotel.findMany();

    if (!hotels) {
      return NextResponse.json({ error: "No hotels found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, hotels }, { status: 200 });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching hotels." },
      { status: 500 }
    );
  }
}
