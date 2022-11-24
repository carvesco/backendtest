import mongoose from "mongoose";
import config from './config'
(async () => {
  try {
    const db = await mongoose.connect(
      `mongodb+srv://carvesco:${config.MONGO_PASSWORD}@cluster0.qyniqzx.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("database is connected to:", db.connection.name);
  } catch (err) {
    console.log(err)
  }
})();
