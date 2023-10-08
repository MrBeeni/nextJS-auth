import mongoose from "mongoose";

const mongoServer = async () => {
  try {
    mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect to DB !!!");
  } catch (err) {
    console.log(err);
  }
};
mongoServer();
