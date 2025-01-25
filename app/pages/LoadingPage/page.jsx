"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function LoadingPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.publicMetadata?.role === "admin") {
        router.push("../../admin");
      } else {
        router.push("../../pages/dashboardHome");
      }
    }
  }, [user, router]);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <h1 className="mt-4 text-lg font-medium text-gray-700">
          Redirecting...
        </h1>
      </div>
    </div>
  );
}
