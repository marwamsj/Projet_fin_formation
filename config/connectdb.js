const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,

    });
    console.log("databse is connected");
  } catch (error) {
    console.log("database is not connected");
  }
};
module.exports = connectDB;
