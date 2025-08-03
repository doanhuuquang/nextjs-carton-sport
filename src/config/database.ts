import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }
    await mongoose.connect(uri);
    console.log("Mongodb connected");
    return true;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
