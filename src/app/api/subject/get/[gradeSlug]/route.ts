// src/app/api/subject/get/[gradeSlug]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { SubjectDocument } from "@/types/schemaTypes";
import { connectDB } from "@/lib/backend/db";
import subject from "@/lib/models/subject";
import verifyUser from "@/lib/backend/verifyUser";

export async function GET(
  req: NextRequest,
  context: { params: { gradeSlug: string } }
) {
  try {
    await verifyUser();

    const { gradeSlug } = await context.params;

    if (!gradeSlug) {
      return NextResponse.json(
        { success: false, message: "Grade parameter is missing" },
        { status: 400 }
      );
    }

    console.log("[GET_SUBJECTS]", gradeSlug);

    const gradeNumber = parseInt(gradeSlug, 10);

    if (isNaN(gradeNumber) || gradeNumber < 1 || gradeNumber > 12) {
      return NextResponse.json(
        { success: false, message: "Invalid grade provided" },
        { status: 400 }
      );
    }

    await connectDB();

    const subjects = await subject
      .find({ grade: gradeNumber })
      .lean<SubjectDocument[]>();

    return NextResponse.json(
      { success: true, data: subjects },
      { status: 200 }
    );
  } catch (error) {
    console.log("[GET_SUBJECTS_ERROR]", error);

    const message = (error as Error).message || "Internal Server Error";

    return NextResponse.json(
      { success: false, message },
      { status: message.includes("Unauthorized") ? 401 : 500 }
    );
  }
}
