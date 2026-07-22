import dotenv from "dotenv";
import mongoose from "mongoose";

import Problem from "./models/Problem.js";
import problems from "./data/problems.js";

dotenv.config();

const seedProblems = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Problem.deleteMany();

    console.log("Old problems deleted");

    await Problem.insertMany(problems);

    console.log(`${problems.length} problems inserted successfully`);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProblems();