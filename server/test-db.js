import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

console.log("Testing MongoDB...");
console.log("Node:", process.version);

try {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log("✅ Connected!");
  console.log(conn.connection.host);

  process.exit(0);
} catch (err) {
  console.error(err);
  process.exit(1);
}
