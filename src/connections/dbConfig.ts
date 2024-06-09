import mongoose from "mongoose";

export async function connect(){
    try {
      await mongoose.connect(process.env.MONGO_URI!);

      const connection = mongoose.connection;
      connection.on('connected', () => {
        console.log('>>> DB is connected');
      });

      connection.on('error', (err) => {
        console.log('>>> Error in connection', err);
        process.exit(1);
      });

      console.log('>>> DB is connected');

    }
    catch (error) {
      console.log('Something went wrong', error);
    }
}