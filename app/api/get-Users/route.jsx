// app/api/get-Users/route.jsx
import { clerkClient } from "@clerk/nextjs/server";

// Handle GET requests
export async function GET(req) {
  try {
    // Fetch user list from Clerk
    const users = await clerkClient.users.getUserList();
    return new Response(JSON.stringify({ users: users.data }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching users", details: error.message }),
      { status: 500 }
    );
  }
}
