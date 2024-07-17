import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(
      process.env.MONGODB_URL ||
        "mongodb+srv://dashboard-data:database-password@cluster0.faghjic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (err) {
    console.log("mododb error",err);
  }
};


