import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect("mongodb+srv://bookwebsite11_db_user:Book123@bookwebapp.s35itu7.mongodb.net/");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB connection error:", error);
  }
};
