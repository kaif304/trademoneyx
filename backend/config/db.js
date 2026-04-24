import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    }
    catch (error){
        console.log("Database Connection Failed!");
        console.error(error.message);

        process.exit(1);
    }
}