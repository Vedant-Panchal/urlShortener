import mongoose from "mongoose";

const connectMongo = async (url: string) => {
 return mongoose.connect(url);
}

export default connectMongo;