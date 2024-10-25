// app/api/check-user/route.ts
import { Connection } from "@/Database/connection";
import Student from "@/Models/StudentModel";
import Agent from "@/Models/AgentModel";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const clerkId = request.headers.get("clerkId");
    if (!clerkId) {
      return NextResponse.json({ error: "No clerkId provided" }, { status: 400 });
    }

    await Connection();

    const student = await Student.findOne({ clerkId });
    const agent = await Agent.findOne({ clerkId });

    if (student) {
      return NextResponse.json({ role: "student", data: student });
    }

    if (agent) {
      return NextResponse.json({ role: "agent", data: agent });
    }

    return NextResponse.json({ role: null });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}