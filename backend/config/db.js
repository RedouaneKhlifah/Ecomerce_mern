import mongoose from "mongoose";
import Dotenv from "dotenv";

Dotenv.config();
async function ConnectDB() {
  try {
    const con = await mongoose.connect(process.env.Mongo_URI);
    console.log(`mongodb Connected ${con.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default ConnectDB;
