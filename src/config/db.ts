import mongoose from "mongoose";

const connectDB = async () : Promise<void> => {
    try {
        const uri = process.env.MONGODB_URI as string
        const conn = await mongoose.connect(uri)
        console.log(`Database Berhasil Terhubung ${conn.connection.host}`);
    } catch (error) {
        console.log(`Gagal Terhubung Ke Database: ${error}`);
        process.exit(1)
    }
}

export default connectDB