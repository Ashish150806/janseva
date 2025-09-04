import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("🔑 Mongo URI:", process.env.MONGO_URI); // DEBUG
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      ssl: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
