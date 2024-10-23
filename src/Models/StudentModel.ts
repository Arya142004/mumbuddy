import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    studentname: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    studentemail: {
      type: String,
      required: true,
    },
    studentphone: {
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
    preflocation: {
      type: String,
      required: true,
    },
    studentphoto: {
      type: String,
    },
    preferences: [],
  },
  { timestamps: true }
);

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
