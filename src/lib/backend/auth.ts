import { NextRequest } from "next/server";
import { cookies as nextCookies, RequestCookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { DecodedToken } from "@/app/api/user/get/route";

const JWT_SECRET = process.env.JWT_SECRET!;

// Overload signatures
type GetTokenArg = NextRequest | { cookies: RequestCookies };

export function getToken(arg: GetTokenArg): string | null {
  // If arg is NextRequest
  if (arg instanceof NextRequest) {
    return arg.cookies.get("token")?.value || null;
  }
  // If arg is an object with cookies (from next/headers)
  if ("cookies" in arg && typeof arg.cookies.get === "function") {
    return arg.cookies.get("token")?.value || null;
  }
  return null;
}

export async function verifyToken(token: string): Promise<DecodedToken | null> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    console.log("Token verified:", payload);

    const decoded: DecodedToken = {
      userId:
        typeof payload.userId === "string"
          ? payload.userId
          : (payload.userId as Buffer).toString(),
      username: payload.username as string,
    };

    return decoded;
  } catch (err: any) {
    console.error("Token verification error:", err.message);
    return null;
  }
}

interface UserType {
  userId: string | number;
  username: string;
}

export async function signToken(user: UserType) {
  const payload = {
    userId: user.userId.toString(),
    username: user.username,
  };

  const secret = new TextEncoder().encode(JWT_SECRET!);

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);

  return token;
}
