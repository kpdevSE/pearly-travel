import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const id = await params?.id;

    if (!id) {
      return NextResponse.json(
        { error: "Campaign Item ID is required." },
        { status: 400 }
      );
    }

    const campaignItems = await prisma.campaignItem.findUnique({
      where: { id },
    });

    if (!campaignItems) {
      return NextResponse.json(
        { error: "Campaign Item not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, campaignItems }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Campaign Items:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the Capiagn iTems." },
      { status: 500 }
    );
  }
}
