import { mongoose } from 'mongoose';

export default async function dbInit() {
  try {
    const mongo = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'Contacts',
    });
    console.log(`DB connected to ${mongo.connection.name}`);
  } catch (error) {
    console.log(error.message);
    throw new Error('DB connection failed. Shutting down...');
  }
}
