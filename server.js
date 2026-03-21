require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");
const runWorker = require("./src/worker/validater");

runWorker();
// start DB
connectDB();

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});