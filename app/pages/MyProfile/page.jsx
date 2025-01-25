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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
