import mongoose from "mongoose";

const Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to the database");
  } catch (error) {
    console.log(error);
  }
};

export default Connection;
