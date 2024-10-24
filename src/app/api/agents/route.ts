import { NextResponse } from "next/server";
import { Connection } from "@/Database/connection";
import Agent from "@/Models/AgentModel";
import mongoose from "mongoose";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const {userId} = auth();
  try {
    const body = await req.json();
    await Connection();

    const agentdata = {
      role: "agent",
      name: body.name,
      userId: new mongoose.Types.ObjectId().toString(),
      clerkId : userId,
      email: body.email,
      phone: body.phone,
      agency: body.agency,
    };

    const agent = await Agent.create(agentdata);
    return NextResponse.json(
      { message: "Agent created successfully", agent },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating agent", error },
      { status: 500 }
    );
  }
}
