// pages/admin/user-list.js

import { useUser } from "@clerk/nextjs";

export default function UserList() {
  const { user } = useUser(); // Access the logged-in user's information

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>User List</h1>
      <div>
        <h1>User List</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p>{user.emailAddresses[0]?.emailAddress}</p>
              <p>{user.publicMetadata.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch user data from Clerk API
    const users = await clerkClient.users.getUserList();

    return {
      props: {
        users: users.data, // Passing user data to the component
      },
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      props: {
        users: [], // Empty array if there's an error
      },
    };
  }
}
