import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "student",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
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
    description: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    preflocation: [
      {
        value: String,
        label: String,
      },
    ],
    profileImage: {
      type: String,
      required: false,
    },
    preferences: [
      {
        value: String,
        label: String,
      },
    ],
    budget: [
      {
        value: String,
        label: String,
      },
    ],
  },
  { timestamps: true }
);
const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
