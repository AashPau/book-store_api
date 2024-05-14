import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const con = await mongoose.connect(process.env.Mongo_URL);
    con && console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};
