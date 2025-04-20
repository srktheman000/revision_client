// src/app/api/user/get/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/backend/db";
import User from "@/lib/models/user";
import verifyUser from "@/lib/backend/verifyUser";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: NextRequest) {
  try {
    const decoded = await verifyUser();

    await connectDB();

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log("Error fetching user:", error);
    const message = (error as Error).message || "Internal Server Error";
    return NextResponse.json(
      { error: message },
      { status: message.includes("Unauthorized") ? 401 : 500 }
    );
  }
}
