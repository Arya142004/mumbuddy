import { NextResponse } from "next/server";
import { Connection } from "@/Database/connection";
import Student from "@/Models/StudentModel";
import mongoose from "mongoose";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = auth();
  try {
    const body = await req.json();
    await Connection();

    const studentData = {
      role: "student",
      name: body.name,
      userId: new mongoose.Types.ObjectId().toString(),
      clerkId: userId,
      email: body.email,
      phone: body.phone,
      description: body.description,
      college: body.college,
      preflocation: body.preflocation,
      profileImage: body.profileImage,
      preferences: body.preferences,
      budget: body.budget,
    };

    const student = await Student.create(studentData);

    return NextResponse.json(
      { message: "Student created successfully", student },
      { status: 201 }
    );
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      {
        message: "Error creating student",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
