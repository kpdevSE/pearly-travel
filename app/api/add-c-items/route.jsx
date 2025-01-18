import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      imageUrl,
      description,
      quantity,
      price,
      clerkUserId,
      clerkUserName,
      clerkUserEmail,
    } = body;

    // Validate required fields
    if (
      !name ||
      !imageUrl ||
      !description ||
      quantity === undefined ||
      price === undefined ||
      !clerkUserId ||
      !clerkUserEmail
    ) {
      return NextResponse.json(
        { error: "All fields are required, including user information." },
        { status: 400 }
      );
    }

    // Create a new CampaignItem record in the database
    const newCampaignItem = await prisma.campaignItem.create({
      data: {
        name,
        imageUrl,
        description,
        quantity: parseInt(quantity, 10),
        price: parseFloat(price),
        clerkUserId,
        clerkUserName: clerkUserName || "Anonymous",
        clerkUserEmail,
      },
    });

    // Respond with the created CampaignItem data
    return NextResponse.json(
      { success: true, campaignItem: newCampaignItem },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating CampaignItem:", error);

    return NextResponse.json(
      { error: "An error occurred while adding the campaign item." },
      { status: 500 }
    );
  }
}
