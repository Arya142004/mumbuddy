import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    agentname: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    agentemail: {
      type: String,
      required: true,
    },
    agentphone: {
      type: String,
      required: true,
    },
    agency: {
      type: String,
    },
    agentphoto: {
      type: String,
    },
  },
  { timestamps: true }
);

const Agent = mongoose.models.Agent || mongoose.model("Agent", agentSchema);

export default Agent;
