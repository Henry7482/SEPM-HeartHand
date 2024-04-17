import mongoose from "mongoose";
import db from "../configs/db.js";

const MONGODB_URL = `mongodb+srv://${db.user}:${db.password}@${db.ip}/default`;

const connectDB = async () => {
  console.log("Connecting to MongoDB...");
  mongoose.connect(MONGODB_URL);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB!");
  });
};

export default connectDB;