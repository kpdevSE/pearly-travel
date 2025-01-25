"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (user?.publicMetadata?.role !== "admin") {
      router.push("../pages/dashboardHome"); // Redirect non-admin users
      return;
    }

    fetch("/api/get-Users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users || []); // Ensure users is always an array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, [isLoaded, user, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <p>
        This is the protected admin dashboard restricted to users with the
        `admin` role.
      </p>

      <div>
        <h1>User List</h1>
        <ul>
          {users && users.length > 0 ? (
            users.map((user) => (
              <li key={user.id}>
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <p>{user.emailAddresses[0]?.emailAddress}</p>
                <p>{user.publicMetadata?.role}</p>
              </li>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </ul>

        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
}
