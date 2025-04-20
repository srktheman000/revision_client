import { IUser } from "@/types/schemaTypes";

/**
 * Fetches the current authenticated user from the API.
 * @returns {Promise<User | null>} The user object if authenticated, otherwise null.
 * @throws {Error} Throws if the network request fails unexpectedly.
 */
export async function fetchUserData(): Promise<IUser | null> {
  const res = await fetch("/api/user/get", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data?.user ?? null;
}
