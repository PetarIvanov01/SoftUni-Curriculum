import mongoose from "mongoose";


const DB_CONFIG = async (): Promise<void> => {

    try {
        mongoose.connect(process.env.MONGO_CONNECTION_STRING)

    } catch (error) {
        console.error(error);
        process.exit(1);
    }


}

export default DB_CONFIG