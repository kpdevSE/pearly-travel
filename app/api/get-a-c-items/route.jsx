import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all CampaignItem records from the database
    const campaignItems = await prisma.campaignItem.findMany();

    // Check if no records are found
    if (!campaignItems || campaignItems.length === 0) {
      return NextResponse.json(
        { error: "No campaign items found." },
        { status: 404 }
      );
    }

    // Respond with the fetched records
    return NextResponse.json({ success: true, campaignItems }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error("Error fetching campaign items:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching campaign items." },
      { status: 500 }
    );
  }
}
