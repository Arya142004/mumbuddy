import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    clerkId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    agency: {
      type: String,
    },
  },
  { timestamps: true }
);

const Agent = mongoose.models.Agent || mongoose.model("Agent", agentSchema);

export default Agent;
