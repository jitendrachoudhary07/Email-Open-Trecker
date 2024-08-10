import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Database Connected");
  } catch (error) {
    console.log("Database connection failed");
    process.exit(1);
  }
};
