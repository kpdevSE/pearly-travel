"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import NavigationBar from "../../components/NavigationBar";

const ViewProfile = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  console.log(user);

  console.log(user.unsafeMetadata);

  return (
    <div>
      <NavigationBar />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <Image
                src={user.imageUrl}
                width={400}
                height={400}
                alt={`${user.firstName} ${user.lastName} Profile Picture`}
                className="rounded-[10px] border-4 border-gray-300"
              />
            </div>
            <h2 className="text-2xl font-semibold mt-4 text-gray-800">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-500 text-sm">
              {user.emailAddresses
                .map((email) => email.emailAddress)
                .join(", ")}
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              {user.primaryPhoneNumber || "Not provided"}
            </p>
            <p>
              <strong>Web3 Wallet:</strong>{" "}
              {user.primaryWeb3Wallet || "Not connected"}
            </p>
            <p>
              <strong>Account Created:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Last Sign-In:</strong>{" "}
              {user.lastSignInAt
                ? new Date(user.lastSignInAt).toLocaleDateString()
                : "Never"}
            </p>
            <p>
              <strong>2FA Enabled:</strong>{" "}
              {user.twoFactorEnabled ? "Yes" : "No"}
            </p>
            <p>
              <strong>Email Verified:</strong>{" "}
              {user.email_verified ? "Yes" : "No"}
            </p>
            <p>
              <strong>Phone Verified:</strong>{" "}
              {user.phone_number_verified ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
