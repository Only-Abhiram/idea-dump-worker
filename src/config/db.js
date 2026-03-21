const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
};

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB Connected");
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

module.exports = connectDB;