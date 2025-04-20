// src/lib/verifyUser.ts
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/backend/auth";
import { DecodedToken } from "@/types";

async function verifyUser(): Promise<DecodedToken> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }

  const decoded = await verifyToken(token);

  if (!decoded || !decoded.userId) {
    throw new Error("Unauthorized: Invalid token");
  }

  return decoded;
}

export default verifyUser;
