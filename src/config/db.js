import mongoose from "mongoose";

const DBConnection = async () => {
    try {
        const DB = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB Connecting to ${DB.connection.host}:${DB.connection.port}`);
    } catch (error) {
        console.log(`Failed to connect`);
    }
}
export default DBConnection